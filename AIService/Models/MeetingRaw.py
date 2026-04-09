try:
    from Models.db import db
except ImportError:
    from AIService.Models.db import db

class MeetingRaw(db.Model):
    __tablename__ = "meetings_raw"

    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.JSON)
    created_at = db.Column(db.DateTime)