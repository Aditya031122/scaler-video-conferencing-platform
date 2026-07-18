from sqlalchemy.orm import Session
from typing import Optional, List
from app.repositories.participant_repository import ParticipantRepository
from app.schemas.participant import ParticipantCreate, ParticipantUpdate, ParticipantResponse


class ParticipantService:
    def __init__(self, db: Session):
        self.repository = ParticipantRepository(db)

    def create_participant(self, participant_data: ParticipantCreate) -> ParticipantResponse:
        participant = self.repository.create(participant_data)
        return ParticipantResponse.model_validate(participant)

    def get_participant(self, participant_id: int) -> Optional[ParticipantResponse]:
        participant = self.repository.get_by_id(participant_id)
        if participant:
            return ParticipantResponse.model_validate(participant)
        return None

    def get_participants_by_meeting(self, meeting_id: int) -> List[ParticipantResponse]:
        participants = self.repository.get_by_meeting_id(meeting_id)
        return [ParticipantResponse.model_validate(p) for p in participants]

    def update_participant(self, participant_id: int, participant_data: ParticipantUpdate) -> Optional[ParticipantResponse]:
        participant = self.repository.update(participant_id, participant_data)
        if participant:
            return ParticipantResponse.model_validate(participant)
        return None

    def delete_participant(self, participant_id: int) -> bool:
        return self.repository.delete(participant_id)

    def delete_participants_by_meeting(self, meeting_id: int) -> int:
        return self.repository.delete_by_meeting_id(meeting_id)
