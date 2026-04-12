from datetime import datetime
try:
    from Models.MeetingRaw import MeetingRaw
except:
    from AIService.Models.MeetingRaw import MeetingRaw

class CalendarNotification:
    def __init__(self):
        self.meeting_raw = MeetingRaw()

    def _serialize(self, meetings):
        return [{
            "id": m.id,
            "data": m.data,
            "created_at": str(m.created_at)
        }for m in meetings]

    def _format_datetime(self, raw_value):
        if not raw_value:
            return None

        try:
            dt = datetime.fromisoformat(str(raw_value))
            return dt.strftime("%H:%M %d/%m/%Y")
        except ValueError:
            return str(raw_value)

    def _extract_latest_meeting(self, meetings):
        if not meetings:
            return None

        for meeting in meetings:
            data = meeting.get("data") or {}
            if isinstance(data, dict) and data:
                return data

        return None

    def _build_message(self, meeting):
        if not isinstance(meeting, dict):
            return "Chua co lich hop nao de nhac."

        intent = meeting.get("intent") or {}
        title = intent.get("title") or "Cuoc hop"
        start_time = self._format_datetime(intent.get("start_time"))
        end_time = self._format_datetime(intent.get("end_time"))
        meet_link = meeting.get("meet_link")
        attendees = intent.get("attendees") or []
        missing_fields = intent.get("missing_fields") or []

        parts = [f"Nhac lich: {title}"]

        if start_time:
            parts.append(f"Bat dau: {start_time}")
        if end_time:
            parts.append(f"Ket thuc: {end_time}")
        if meet_link:
            parts.append(f"Link hop: {meet_link}")
        if attendees:
            parts.append(f"Nguoi tham gia: {', '.join(attendees)}")
        if "attendees" in missing_fields:
            parts.append("Chua co danh sach nguoi tham gia.")

        return ". ".join(parts) + "."

    def querry_db(self):
        data = (
            self.meeting_raw.query
            .order_by(MeetingRaw.id.desc())
            .limit(5)
            .all()
        )

        data_json = self._serialize(data)
        latest_meeting = self._extract_latest_meeting(data_json)

        return {
            "message": self._build_message(latest_meeting),
            "latest_meeting": latest_meeting
        }
