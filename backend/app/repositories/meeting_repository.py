from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime
from app.models.meeting import Meeting
from app.schemas.meeting import MeetingCreate, MeetingUpdate, MeetingSchedule
import uuid


class MeetingRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, meeting_data: MeetingCreate) -> Meeting:
        meeting_id = str(uuid.uuid4())
        db_meeting = Meeting(
            meeting_id=meeting_id,
            **meeting_data.model_dump()
        )
        self.db.add(db_meeting)
        self.db.commit()
        self.db.refresh(db_meeting)
        return db_meeting

    def schedule(self, meeting_data: MeetingSchedule) -> Meeting:
        meeting_id = str(uuid.uuid4())
        db_meeting = Meeting(
            meeting_id=meeting_id,
            **meeting_data.model_dump()
        )
        self.db.add(db_meeting)
        self.db.commit()
        self.db.refresh(db_meeting)
        return db_meeting

    def get_by_id(self, meeting_id: int) -> Optional[Meeting]:
        return self.db.query(Meeting).filter(Meeting.id == meeting_id).first()

    def get_by_meeting_id(self, meeting_id: str) -> Optional[Meeting]:
        return self.db.query(Meeting).filter(Meeting.meeting_id == meeting_id).first()

    def get_all(self, skip: int = 0, limit: int = 100) -> List[Meeting]:
        return self.db.query(Meeting).order_by(Meeting.created_at.desc()).offset(skip).limit(limit).all()

    def get_recent(self, skip: int = 0, limit: int = 10) -> List[Meeting]:
        return self.db.query(Meeting).filter(
            Meeting.is_active == False
        ).order_by(Meeting.created_at.desc()).offset(skip).limit(limit).all()

    def get_upcoming(self, skip: int = 0, limit: int = 10) -> List[Meeting]:
        now = datetime.utcnow()
        return self.db.query(Meeting).filter(
            Meeting.is_active == True,
            Meeting.scheduled_date >= now
        ).order_by(Meeting.scheduled_date.asc()).offset(skip).limit(limit).all()

    def get_active_meetings(self, skip: int = 0, limit: int = 100) -> List[Meeting]:
        return self.db.query(Meeting).filter(Meeting.is_active == True).offset(skip).limit(limit).all()

    def update(self, meeting_id: int, meeting_data: MeetingUpdate) -> Optional[Meeting]:
        db_meeting = self.get_by_id(meeting_id)
        if db_meeting:
            update_data = meeting_data.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_meeting, field, value)
            self.db.commit()
            self.db.refresh(db_meeting)
        return db_meeting

    def delete(self, meeting_id: int) -> bool:
        db_meeting = self.get_by_id(meeting_id)
        if db_meeting:
            self.db.delete(db_meeting)
            self.db.commit()
            return True
        return False
