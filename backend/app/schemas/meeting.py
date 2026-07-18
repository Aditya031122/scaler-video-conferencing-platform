from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from app.schemas.participant import ParticipantResponse


class MeetingBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    host_name: str = Field(..., min_length=1, max_length=100)
    scheduled_date: Optional[datetime] = None
    scheduled_time: Optional[str] = None
    duration: Optional[int] = None


class MeetingCreate(MeetingBase):
    pass


class MeetingSchedule(MeetingBase):
    scheduled_date: datetime = Field(...)
    scheduled_time: str = Field(..., min_length=1, max_length=10)
    duration: int = Field(..., gt=0)


class MeetingJoin(BaseModel):
    meeting_id: str = Field(..., min_length=1)
    display_name: str = Field(..., min_length=1, max_length=100)


class MeetingUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    scheduled_date: Optional[datetime] = None
    scheduled_time: Optional[str] = None
    duration: Optional[int] = None
    is_active: Optional[bool] = None


class MeetingResponse(MeetingBase):
    id: int
    meeting_id: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    participants: List[ParticipantResponse] = []

    class Config:
        from_attributes = True


class MeetingListResponse(BaseModel):
    id: int
    meeting_id: str
    title: str
    host_name: str
    scheduled_date: Optional[datetime] = None
    scheduled_time: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
