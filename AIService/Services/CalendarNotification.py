from datetime import datetime
try:
    from Models.AI import AI
except:
    from AIService.Models.AI import AI
try:
    from Models.MeetingRaw import MeetingRaw
except:
    from AIService.Models.MeetingRaw import MeetingRaw

class CalendarNotification:
    def __init__(self):
        self.meeting_raw = MeetingRaw()
        self.ai = AI()

    def _serialize(self, meetings):
        return [{
            "id": m.id,
            "data": m.data,
            "created_at": str(m.created_at)
        }for m in meetings]

    def _build_promt(self, data):
        return f"""
Ban la AI tro ly lich hop.

Du lieu lich hop:
{data}

Hay:
1. Tim cuoc hop gan nhat
2. Tao loi nhac

Chi tra ve JSON:
{{
    "content": "..."
}}
"""

    def querry_db(self):

        data = (
            self.meeting_raw.query
            .order_by(MeetingRaw.created_at.desc())
            .limit(5)
            .all()
        )

        data_json = self._serialize(data)

        prompt = self._build_promt(data=data_json)
        
        reesult = self.ai.generate(prompt= prompt)

        return reesult

