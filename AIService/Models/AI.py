import os

import requests
from dotenv import load_dotenv


BASE_DIR = os.path.dirname(os.path.dirname(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")

load_dotenv(ENV_PATH)


class AI:
    def __init__(self):
        self.api_key = (
            os.getenv("GEMINI_API_KEY")
            or os.getenv("GOOGLE_API_KEY")
        )
        self.api_key = self.api_key.strip().strip("\"'") if self.api_key else None
        self.model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        self.timeout = int(os.getenv("AI_TIMEOUT", "30"))

    def generate(self, prompt):
        if not self.api_key:
            raise ValueError("Missing Gemini API key.")

        response = requests.post(
            f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent",
            headers={
                "x-goog-api-key": self.api_key,
                "Content-Type": "application/json",
            },
            json={
                "contents": [
                    {
                        "parts": [
                            {
                                "text": prompt,
                            }
                        ]
                    }
                ]
            },
            timeout=self.timeout,
        )
        if not response.ok:
            try:
                error_payload = response.json()
            except ValueError:
                error_payload = {"error": {"message": response.text}}
            raise ValueError(
                error_payload.get("error", {}).get("message", "Gemini request failed.")
            )

        data = response.json()
        candidates = data.get("candidates", [])
        if not candidates:
            return ""

        content = candidates[0].get("content", {})
        parts = content.get("parts", [])
        texts = [part.get("text", "") for part in parts if part.get("text")]
        return "\n".join(texts).strip()
