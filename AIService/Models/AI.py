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
        self.default_max_tokens = int(os.getenv("AI_MAX_TOKENS", "256"))
        self.retry_max_tokens = int(os.getenv("AI_RETRY_MAX_TOKENS", "512"))

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
    def _make_cache_key(self, prompt, max_tokens):
        return f"{self.model}:{max_tokens}:{prompt}"

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

    def _request(self, prompt, max_tokens,  temperature=None):
        try:
            request_kwargs = {
                "model": self.model,
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "max_completion_tokens": max_tokens,
                "timeout": self.timeout,
            }

            if temperature is not None:
                request_kwargs["temperature"] = temperature

            response = self.client.chat.completions.create(
                **request_kwargs
            )
            return response

        except Exception as ex:
            raise ValueError(f"OpenAI request failed: {ex}") from ex

    def _extract_text(self, response):
        output_text = getattr(response, "output_text", None)
        if isinstance(output_text, str) and output_text.strip():
            return output_text.strip()

        choices = getattr(response, "choices", None) or []
        if not choices:
            return ""

        message = getattr(choices[0], "message", None)
        if message is None:
            return ""

        content = getattr(message, "content", None)

        if isinstance(content, str):
            return content.strip()

        if isinstance(content, list):
            parts = []
            for item in content:
                if isinstance(item, str):
                    if item.strip():
                        parts.append(item.strip())
                    continue

                text_value = None
                if hasattr(item, "text"):
                    text_value = getattr(item, "text", None)
                elif isinstance(item, dict):
                    text_value = item.get("text")

                if isinstance(text_value, str) and text_value.strip():
                    parts.append(text_value.strip())
                elif hasattr(text_value, "value"):
                    nested_value = getattr(text_value, "value", None)
                    if isinstance(nested_value, str) and nested_value.strip():
                        parts.append(nested_value.strip())

            return "\n".join(parts).strip()

        return ""

    def _response_debug(self, response):
        details = []

        choices = getattr(response, "choices", None) or []
        if choices:
            choice = choices[0]
            finish_reason = getattr(choice, "finish_reason", None)
            if finish_reason:
                details.append(f"finish_reason={finish_reason}")

            message = getattr(choice, "message", None)
            if message is not None:
                refusal = getattr(message, "refusal", None)
                if refusal:
                    details.append(f"refusal={refusal}")

                content = getattr(message, "content", None)
                if content is not None:
                    details.append(f"content_type={type(content).__name__}")

        if not details:
            details.append(f"response_type={type(response).__name__}")

        return ", ".join(details)

    def generate(self, prompt, max_tokens=None, temperature=1, use_cache=True):
        prompt = str(prompt).strip()
        if not prompt:
            return ""

        if max_tokens is None:
            max_tokens = self.default_max_tokens

        cache_key = self._make_cache_key(prompt, max_tokens)

        if use_cache:
            cached = self._get_cached(cache_key)
            if cached is not None:
                return cached

        response = self._request(prompt, max_tokens, temperature)
        result = self._extract_text(response)
        debug_info = self._response_debug(response)

        # retry nếu bị cắt output
        if not result and self.retry_max_tokens > max_tokens:
            response = self._request(prompt, self.retry_max_tokens, temperature)
            result = self._extract_text(response)
            debug_info = self._response_debug(response)

        if not result:
            raise ValueError(f"OpenAI trả về rỗng ({debug_info})")

        if use_cache:
            self._set_cache(cache_key, result)

        return result
