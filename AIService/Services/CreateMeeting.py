from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from pathlib import Path
from uuid import uuid4

SCOPES = ["https://www.googleapis.com/auth/calendar"]


def _find_existing_path(candidates):
    return next((path for path in candidates if path.exists()), None)


def _token_candidates():
    base_dir = Path(__file__).resolve().parents[1]
    project_dir = Path(__file__).resolve().parents[2]
    return [
        Path("token.json"),
        project_dir / "token.json",
        base_dir / "token.json",
    ]


def _credentials_candidates():
    base_dir = Path(__file__).resolve().parents[1]
    project_dir = Path(__file__).resolve().parents[2]
    return [
        Path("credentials.json"),
        project_dir / "credentials.json",
        base_dir / "credentials.json",
    ]


def _save_token(token_path, creds):
    token_path.parent.mkdir(parents=True, exist_ok=True)
    token_path.write_text(creds.to_json(), encoding="utf-8")


def _load_calendar_credentials():
    token_path = _find_existing_path(_token_candidates())
    creds = None

    if token_path is not None:
        creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)
        if creds and creds.valid:
            return creds

        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
            _save_token(token_path, creds)
            return creds

    credentials_path = _find_existing_path(_credentials_candidates())
    if credentials_path is None:
        raise FileNotFoundError(
            "Khong tim thay credentials.json de dang nhap Google Calendar."
        )

    try:
        flow = InstalledAppFlow.from_client_secrets_file(str(credentials_path), SCOPES)
        creds = flow.run_local_server(port=0)
    except Exception as ex:
        raise FileNotFoundError(
            "Chua co token.json va khong the tu dong dang nhap Google Calendar. "
            "Hay chay AIService/test.py de cap quyen va tao token.json. "
            f"Chi tiet: {ex}"
        ) from ex

    token_path = token_path or (credentials_path.resolve().parent / "token.json")
    _save_token(token_path, creds)
    return creds


def create_event(summary, start_time, end_time, attendees):
    creds = _load_calendar_credentials()
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