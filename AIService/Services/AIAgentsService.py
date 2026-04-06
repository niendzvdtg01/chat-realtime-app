from Models.AI import AI

class AIAgentService:
    def __init__(self):
        self.ai = AI()

    def _build_prompt(self, conversation, tone, count):
        return (
            "Ban la tro ly AI ho tro goi y tin nhan tra loi cho nguoi dung.\n"
            f"Hay dua ra dung {count} cau tra loi ngan, tu nhien, tone {tone}.\n"
            "Chi tra ve cac cau goi y de gui di ngay.\n"
            "Khong giai thich, khong danh so, khong mo dau, moi dong la mot goi y.\n\n"
            "Noi dung hoi thoai:\n"
            f"{conversation}"
        )

    def _prepare_conversation(self, messages, max_messages=6, max_chars=700):
        cleaned_messages = [str(message).strip() for message in messages if str(message).strip()]
        if not cleaned_messages:
            return ""

        recent_messages = cleaned_messages[-max_messages:]
        conversation = "\n".join(recent_messages)
        if len(conversation) <= max_chars:
            return conversation

        return conversation[-max_chars:]

    def _normalize_suggestions(self, ai_text, count):
        suggestions = []

        for line in ai_text.splitlines():
            cleaned = line.strip()
            if not cleaned:
                continue

            cleaned = cleaned.lstrip("-*0123456789. ").strip()
            if cleaned:
                suggestions.append(cleaned)

        if not suggestions and ai_text.strip():
            suggestions = [ai_text.strip()]

        return suggestions[:count]

    def suggestMessages(self, messages, tone="friendly", count=3):
        try:
            if not messages:
                return ["Khong co noi dung de goi y."]

            if isinstance(messages, str):
                messages = [messages]

            conversation = self._prepare_conversation(messages)

            if not conversation:
                return ["Khong co noi dung de goi y."]

            safe_count = max(1, min(int(count), 5))
            prompt = self._build_prompt(conversation, tone, safe_count)
            ai_text = self.ai.generate(
                prompt,
                max_tokens=max(160, safe_count * 80),
                temperature=0.15,
            ).strip()

            if not ai_text:
                return ["AI chua tra ve goi y."]

            return self._normalize_suggestions(ai_text, safe_count)
        except Exception as ex:
            print("Error suggesting messages:", ex)
            return [f"Khong the tao goi y luc nay: {ex}"]
