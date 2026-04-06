import json
import re

try:
    from Models.AI import AI
except ImportError:
    from AIService.Models.AI import AI


class Analyzer:
    def __init__(self):
        self.ai = AI()

    def _build_prompt(self, context):
        return f"""
            Ban la AI phan tich hoi thoai.

                Phan tich conversation sau:
                \"\"\"
                {context}
                \"\"\"

            Tra ve DUY NHAT JSON hop le, KHONG giai thich:

            {{
                "intent": "y dinh chinh cua nguoi noi",
                "emotion": "cam xuc (positive | neutral | negative)",
                "relationship": "moi quan he (ban be | dong nghiep | tinh cam | khach hang | khac)",
                  "tone": "tong giong hoi thoai (friendly | formal | flirty | serious | ...)"
            }}
            """

    def _prepare_conversation(self, messages, max_messages=6, max_chars = 700):
        cleaned = [str(m).strip() for m in messages if str(m).strip()]
        if not cleaned:
            return ""
        recent = cleaned[-max_messages:]
        conversation = "\n".join(recent)
        if len(conversation) <= max_chars:
            return conversation
        return conversation[-max_chars:]

    def _extract_json(self, ai_text):
        ai_text = str(ai_text).strip()
        if not ai_text:
            return None

        try:
            return json.loads(ai_text)
        except json.JSONDecodeError:
            match = re.search(r"\{.*\}", ai_text, re.DOTALL)
            if not match:
                return None

            try:
                return json.loads(match.group(0))
            except json.JSONDecodeError:
                return None

    def analyze(self, messages):
        if isinstance(messages, str):
            messages = [messages]
        context = self._prepare_conversation(messages = messages)

        if not context:
            return None

        prompt = self._build_prompt(context)

        try:
            ai_text = self.ai.generate(
                prompt=prompt,
                max_tokens=500,
                temperature=0.1,
                use_cache=False,
            ).strip()
            parsed = self._extract_json(ai_text)
            return parsed if isinstance(parsed, dict) else None
        except Exception as ex:
            print("Error: ", ex)
            return None
