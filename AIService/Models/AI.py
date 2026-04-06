import os
from collections import OrderedDict
from pathlib import Path

import requests


class AI:
    def __init__(self):
        self._load_env_file()
        self.model = os.getenv("OLLAMA_MODEL", "gemma4:e2b")
        self.url = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
        self.timeout = int(os.getenv("AI_TIMEOUT", "60"))
        self.keep_alive = os.getenv("OLLAMA_KEEP_ALIVE", "10m")
        self.max_cache_size = int(os.getenv("AI_CACHE_SIZE", "100"))
        self.default_max_tokens = int(os.getenv("AI_MAX_TOKENS", "256"))
        self.retry_max_tokens = int(os.getenv("AI_RETRY_MAX_TOKENS", "512"))

        # Reuse the same HTTP connection to reduce local inference overhead.
        self.session = requests.Session()
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

    def _get_cached(self, prompt):
        cached = self.cache.get(prompt)
        if cached is None:
            return None

        self.cache.move_to_end(prompt)
        return cached

    def _set_cache(self, prompt, results):
        self.cache[prompt] = results
        self.cache.move_to_end(prompt)

        while len(self.cache) > self.max_cache_size:
            self.cache.popitem(last=False)

    def _request(self, prompt, max_tokens, temperature):
        prompt = str(prompt).strip()
        if not prompt:
            return {"response": "", "done_reason": "empty_prompt"}

        try:
            response = self.session.post(
                self.url,
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False,
                    "keep_alive": self.keep_alive,
                    "options": {
                        "num_predict": max_tokens,
                        "temperature": temperature,
                    },
                },
                timeout=self.timeout,
            )
        except requests.RequestException as ex:
            raise ValueError(
                f"Khong the ket noi toi local AI tai {self.url}. Hay kiem tra Ollama/model dang chay. Chi tiet: {ex}"
            ) from ex

        if not response.ok:
            try:
                error_payload = response.json()
            except ValueError:
                error_payload = {"error": {"message": response.text}}
            raise ValueError(
                error_payload.get("error", {}).get("message", "Local AI request failed.")
            )

        return response.json()

    def generate(self, prompt, max_tokens=None, temperature=0.2, use_cache=True):
        prompt = str(prompt).strip()
        if not prompt:
            return ""

        if max_tokens is None:
            max_tokens = self.default_max_tokens

        if use_cache:
            cached = self._get_cached(prompt)
            if cached is not None:
                return cached

        data = self._request(prompt, max_tokens=max_tokens, temperature=temperature)
        results = data.get("response", "").strip()
        if not results:
            error_message = data.get("error")
            done_reason = data.get("done_reason", "unknown")

            if done_reason == "length" and self.retry_max_tokens > max_tokens:
                data = self._request(
                    prompt,
                    max_tokens=self.retry_max_tokens,
                    temperature=temperature,
                )
                results = data.get("response", "").strip()
                done_reason = data.get("done_reason", done_reason)

            if error_message:
                raise ValueError(str(error_message))
            if results:
                if use_cache:
                    self._set_cache(prompt, results)
                return results
            raise ValueError(
                f"Local AI tra ve rong. done_reason={done_reason}, model={self.model}"
            )

        if use_cache and results:
            self._set_cache(prompt, results)

        return results