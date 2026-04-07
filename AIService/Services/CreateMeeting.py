from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from pathlib import Path
from uuid import uuid4

def create_event(summary, start_time, end_time, attendees):
    token_candidates = [
        Path("token.json"),
        Path(__file__).resolve().parents[2] / "token.json",
        Path(__file__).resolve().parents[1] / "token.json",
    ]
    token_path = next((path for path in token_candidates if path.exists()), None)
    if token_path is None:
        raise FileNotFoundError("Khong tim thay file token.json de truy cap Google Calendar.")

    creds = Credentials.from_authorized_user_file(str(token_path))
    service = build("calendar", "v3", credentials=creds)

    event = {
        "summary": summary,
        "start": {
            "dateTime": start_time,
            "timeZone": "Asia/Ho_Chi_Minh"
        },
        "end": {
            "dateTime": end_time,
            "timeZone": "Asia/Ho_Chi_Minh"
        },
        "attendees": [{"email": email} for email in attendees],
        "conferenceData": {
            "createRequest": {
                "requestId": str(uuid4()),
                "conferenceSolutionKey": {
                    "type": "hangoutsMeet"
                }
            }
        }
    }

    event = service.events().insert(
        calendarId="primary",
        body=event,
        conferenceDataVersion=1
    ).execute()

    if event.get("hangoutLink"):
        return event["hangoutLink"]

    conference_data = event.get("conferenceData", {})
    for entry_point in conference_data.get("entryPoints", []):
        if entry_point.get("entryPointType") == "video":
            return entry_point.get("uri")

    return event.get("htmlLink")
