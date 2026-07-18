from sqlalchemy.orm import Session
from typing import Optional, List
from app.models.participant import MeetingParticipant
from app.schemas.participant import ParticipantCreate, ParticipantUpdate


class ParticipantRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, participant_data: ParticipantCreate) -> MeetingParticipant:
        db_participant = MeetingParticipant(**participant_data.model_dump())
        self.db.add(db_participant)
        self.db.commit()
        self.db.refresh(db_participant)
        return db_participant

    def get_by_id(self, participant_id: int) -> Optional[MeetingParticipant]:
        return self.db.query(MeetingParticipant).filter(MeetingParticipant.id == participant_id).first()

    def get_by_meeting_id(self, meeting_id: int) -> List[MeetingParticipant]:
        return self.db.query(MeetingParticipant).filter(MeetingParticipant.meeting_id == meeting_id).all()

    def update(self, participant_id: int, participant_data: ParticipantUpdate) -> Optional[MeetingParticipant]:
        db_participant = self.get_by_id(participant_id)
        if db_participant:
            update_data = participant_data.model_dump(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_participant, field, value)
            self.db.commit()
            self.db.refresh(db_participant)
        return db_participant

    def delete(self, participant_id: int) -> bool:
        db_participant = self.get_by_id(participant_id)
        if db_participant:
            self.db.delete(db_participant)
            self.db.commit()
            return True
        return False

    def delete_by_meeting_id(self, meeting_id: int) -> int:
        deleted_count = self.db.query(MeetingParticipant).filter(
            MeetingParticipant.meeting_id == meeting_id
        ).delete()
        self.db.commit()
        return deleted_count
