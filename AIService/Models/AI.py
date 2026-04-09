import os
from collections import OrderedDict
from pathlib import Path

from openai import OpenAI


class AI:
    def __init__(self):
        self._load_env_file()

        # OpenAI config
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = os.getenv("OPENAI_MODEL", "gpt-5-mini")

        # Config
        self.timeout = int(os.getenv("AI_TIMEOUT", "60"))
        self.max_cache_size = int(os.getenv("AI_CACHE_SIZE", "100"))
        self.default_max_tokens = int(os.getenv("AI_MAX_TOKENS", "512"))
        self.retry_max_tokens = int(os.getenv("AI_RETRY_MAX_TOKENS", "1024"))
        self.reasoning_effort = os.getenv("AI_REASONING_EFFORT", "low").strip().lower()

        self.cache = OrderedDict()

    def _load_env_file(self):
        env_path = Path(__file__).resolve().parents[1] / ".env"
        if not env_path.exists():
            return

        for line in env_path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())

    #  FIX: cache theo (prompt + model + max_tokens)
    def _make_cache_key(self, prompt, max_tokens, temperature):
        return f"{self.model}:{max_tokens}:{temperature}:{self.reasoning_effort}:{prompt}"

    def _get_cached(self, key):
        cached = self.cache.get(key)
        if cached is None:
            return None
        self.cache.move_to_end(key)
        return cached

    def _set_cache(self, key, results):
        self.cache[key] = results
        self.cache.move_to_end(key)

        while len(self.cache) > self.max_cache_size:
            self.cache.popitem(last=False)

    def _request(self, prompt, max_tokens, temperature=None):
        try:
            request_options = {
                "model": self.model,
                "input": prompt,
                "max_output_tokens": max_tokens,
                "timeout": self.timeout,
            }

            if temperature is not None:
                request_options["temperature"] = temperature

            if self.model.startswith("gpt-5") and self.reasoning_effort:
                request_options["reasoning"] = {"effort": self.reasoning_effort}

            response = self.client.responses.create(
                **request_options
            )
            return response
        except Exception as ex:
            raise ValueError(f"OpenAI request failed: {ex}") from ex

    def _extract_text(self, response):
    # 1. Ưu tiên shortcut
        text = getattr(response, "output_text", None)
        if isinstance(text, str) and text.strip():
            return text.strip()

    # 2. Parse output chuẩn
        output = getattr(response, "output", None)
        if not output:
            return ""

        parts = []

        for item in output:
            # bỏ qua reasoning
            item_type = getattr(item, "type", None)
            if item_type == "reasoning":
                continue

            contents = getattr(item, "content", None)
            if not contents:
                continue

            for c in contents:
                if getattr(c, "type", None) == "output_text":
                    t = getattr(c, "text", "")
                    if isinstance(t, str) and t.strip():
                        parts.append(t.strip())

        return "\n".join(parts).strip()

    def _response_debug(self, response):
        details = []

        status = getattr(response, "status", None)
        if status:
            details.append(f"status={status}")

        incomplete_details = getattr(response, "incomplete_details", None)
        incomplete_reason = getattr(incomplete_details, "reason", None)
        if incomplete_reason:
            details.append(f"incomplete_reason={incomplete_reason}")

        output = getattr(response, "output", None) or []
        if output:
            details.append(
                "output_types="
                + ",".join(
                    str(getattr(item, "type", "unknown"))
                    for item in output
                )
            )

            for item in output:
                for content in getattr(item, "content", None) or []:
                    content_type = getattr(content, "type", None)
                    if content_type:
                        details.append(f"content_type={content_type}")

                    if content_type == "refusal":
                        refusal_text = getattr(content, "refusal", None) or getattr(content, "text", None)
                        if refusal_text:
                            details.append(f"refusal={refusal_text}")
                        break

        details.append(f"response_type={type(response).__name__}")

        return ", ".join(details)

    def _is_retryable_empty_response(self, response):
        incomplete_details = getattr(response, "incomplete_details", None)
        return getattr(incomplete_details, "reason", None) == "max_output_tokens"

    def generate(self, prompt, max_tokens=None, temperature=None, use_cache=True):
        prompt = str(prompt).strip()
        if not prompt:
            return ""

        if max_tokens is None:
            max_tokens = self.default_max_tokens

        cache_key = self._make_cache_key(prompt, max_tokens, temperature)

        if use_cache:
            cached = self._get_cached(cache_key)
            if cached is not None:
                return cached

        response = self._request(prompt, max_tokens, temperature)
        result = self._extract_text(response)
        debug_info = self._response_debug(response)

        retry_tokens = max(self.retry_max_tokens, max_tokens * 2)

        # Retry nếu model tiêu hết token vào reasoning nên chưa kịp sinh text
        if not result and self._is_retryable_empty_response(response) and retry_tokens > max_tokens:
            response = self._request(prompt, retry_tokens, temperature)
            result = self._extract_text(response)
            debug_info = self._response_debug(response)

        if not result:
            raise ValueError(f"OpenAI trả về rỗng ({debug_info})")

        if use_cache:
            self._set_cache(cache_key, result)

        return result
