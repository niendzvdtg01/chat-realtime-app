try:
    from CreateMeeting import create_event
except ImportError:
    from Services.CreateMeeting import create_event

def create_meet(data):
    attendees = data.get("attendees") or []
    attendees = [email.strip() for email in attendees if str(email).strip()]

    link = create_event(
        summary=data["title"],
        start_time=data["start_time"],
        end_time=data["end_time"],
        attendees=attendees
    )

    return {
        "status": "success",
        "meet_link": link
    }
