from sqlalchemy.orm import Session
from typing import Optional, List
from app.repositories.meeting_repository import MeetingRepository
from app.schemas.meeting import (
    MeetingCreate,
    MeetingSchedule,
    MeetingUpdate,
    MeetingResponse,
    MeetingListResponse,
)


class MeetingService:
    def __init__(self, db: Session):
        self.repository = MeetingRepository(db)

    def create_meeting(self, meeting_data: MeetingCreate) -> MeetingResponse:
        meeting = self.repository.create(meeting_data)
        return MeetingResponse.model_validate(meeting)

    def schedule_meeting(self, meeting_data: MeetingSchedule) -> MeetingResponse:
        meeting = self.repository.schedule(meeting_data)
        return MeetingResponse.model_validate(meeting)

    def get_meeting(self, meeting_id: int) -> Optional[MeetingResponse]:
        meeting = self.repository.get_by_id(meeting_id)
        if meeting:
            return MeetingResponse.model_validate(meeting)
        return None

    def get_meeting_by_meeting_id(self, meeting_id: str) -> Optional[MeetingResponse]:
        meeting = self.repository.get_by_meeting_id(meeting_id)
        if meeting:
            return MeetingResponse.model_validate(meeting)
        return None

    def get_all_meetings(self, skip: int = 0, limit: int = 100) -> List[MeetingListResponse]:
        meetings = self.repository.get_all(skip, limit)
        return [MeetingListResponse.model_validate(m) for m in meetings]

    def get_recent_meetings(self, skip: int = 0, limit: int = 10) -> List[MeetingListResponse]:
        meetings = self.repository.get_recent(skip, limit)
        return [MeetingListResponse.model_validate(m) for m in meetings]

    def get_upcoming_meetings(self, skip: int = 0, limit: int = 10) -> List[MeetingListResponse]:
        meetings = self.repository.get_upcoming(skip, limit)
        return [MeetingListResponse.model_validate(m) for m in meetings]

    def get_active_meetings(self, skip: int = 0, limit: int = 100) -> List[MeetingResponse]:
        meetings = self.repository.get_active_meetings(skip, limit)
        return [MeetingResponse.model_validate(m) for m in meetings]

    def update_meeting(self, meeting_id: int, meeting_data: MeetingUpdate) -> Optional[MeetingResponse]:
        meeting = self.repository.update(meeting_id, meeting_data)
        if meeting:
            return MeetingResponse.model_validate(meeting)
        return None

    def delete_meeting(self, meeting_id: int) -> bool:
        return self.repository.delete(meeting_id)
