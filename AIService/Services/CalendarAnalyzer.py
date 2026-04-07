import json

try:
    from CalendarTool import create_meet
except ImportError:
    from Services.CalendarTool import create_meet

try:
    from Models.AI import AI
except ImportError:
    from AIService.Models.AI import AI


class CalendarAnalyzer:
    def __init__(self):
        self.ai = AI()

    def _build_prompt(self, message):
        return f"""
Extract meeting info from this message:
"{message}"

Return only valid JSON with this exact structure:
{{
  "action": "create_meeting",
  "title": "",
  "start_time": "",
  "end_time": "",
  "attendees": [],
  "missing_fields": [],
  "user_message": ""
}}

Rules:
- Use ISO 8601 datetime for start_time and end_time.
- attendees must be an array of email strings.
- missing_fields must contain any missing values from: ["title", "start_time", "end_time", "attendees"].
- If some field is missing, keep it as empty string or empty array.
- user_message must be a short Vietnamese sentence for the user.
- Do not wrap the JSON in markdown fences.
""".strip()

    def _parse_ai_json(self, ai_text):
        cleaned = ai_text.strip()
        if cleaned.startswith("```"):
            lines = cleaned.splitlines()
            if lines and lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].startswith("```"):
                lines = lines[:-1]
            cleaned = "\n".join(lines).strip()

        return json.loads(cleaned)

    def _normalize_intent(self, intent):
        if not isinstance(intent, dict):
            raise ValueError("AI response is not a JSON object.")

        normalized = {
            "action": str(intent.get("action", "")).strip().lower(),
            "title": str(intent.get("title", "")).strip(),
            "start_time": str(intent.get("start_time", "")).strip(),
            "end_time": str(intent.get("end_time", "")).strip(),
            "attendees": [],
            "missing_fields": [],
            "user_message": str(intent.get("user_message", "")).strip(),
        }

        attendees = intent.get("attendees") or []
        if isinstance(attendees, list):
            normalized["attendees"] = [
                str(email).strip() for email in attendees if str(email).strip()
            ]

        missing_fields = intent.get("missing_fields") or []
        if isinstance(missing_fields, list):
            normalized["missing_fields"] = [
                str(field).strip()
                for field in missing_fields
                if str(field).strip() in {"title", "start_time", "end_time", "attendees"}
            ]

        for field in ("title", "start_time", "end_time"):
            if not normalized[field] and field not in normalized["missing_fields"]:
                normalized["missing_fields"].append(field)

        if not normalized["attendees"] and "attendees" not in normalized["missing_fields"]:
            normalized["missing_fields"].append("attendees")

        return normalized

    def _build_follow_up_question(self, missing_fields):
        questions = {
            "title": "Ban muon dat ten cuoc hop la gi?",
            "start_time": "Ban muon bat dau cuoc hop luc nao?",
            "end_time": "Cuoc hop se ket thuc luc nao?",
            "attendees": "Ban muon moi nhung ai? Hay gui danh sach email nguoi tham gia.",
        }

        prompts = [questions[field] for field in missing_fields if field in questions]
        if not prompts:
            return "Ban bo sung them thong tin giup minh de tao lich hop nhe."

        return " ".join(prompts)

    def _build_clarification_response(self, intent):
        missing_fields = intent.get("missing_fields") or []
        next_question = self._build_follow_up_question(missing_fields)

        return {
            "status": "needs_clarification",
            "action": "create_meeting",
            "message": intent.get("user_message") or "Mình cần thêm thông tin trước khi tạo lịch họp.",
            "next_question": next_question,
            "missing_fields": missing_fields,
            "intent": intent,
        }

    def run(self, message):
        prompt = self._build_prompt(message=message)

        try:
            ai_text = self.ai.generate(prompt=prompt)
            intent = self._normalize_intent(self._parse_ai_json(ai_text))
        except Exception as ex:
            return {
                "status": "error",
                "message": f"Khong phan tich duoc thong tin lich hop: {ex}",
            }

        action = str(intent.get("action", "")).strip().lower()
        if action not in {"create_meeting", "creating_meeting"}:
            return {
                "status": "error",
                "message": "AI khong nhan dien duoc yeu cau tao lich hop.",
                "intent": intent,
            }

        if intent.get("missing_fields"):
            return self._build_clarification_response(intent)

        try:
            results = create_meet(intent)
            results["action"] = "create_meeting"
            results["intent"] = intent
            results["message"] = "Da tao lich hop online thanh cong."
            return results
        except Exception as ex:
            return {
                "status": "error",
                "message": f"Khong tao duoc lich hop online: {ex}",
                "intent": intent,
            }


class CalendarAgentService(CalendarAnalyzer):
    pass


Analyzer = CalendarAnalyzer