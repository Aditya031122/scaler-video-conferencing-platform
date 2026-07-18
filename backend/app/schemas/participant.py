from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ParticipantBase(BaseModel):
    display_name: str = Field(..., min_length=1, max_length=100)
    is_muted: bool = False
    is_camera_on: bool = True


class ParticipantCreate(ParticipantBase):
    meeting_id: int


class ParticipantUpdate(BaseModel):
    display_name: Optional[str] = Field(None, min_length=1, max_length=100)
    is_muted: Optional[bool] = None
    is_camera_on: Optional[bool] = None


class ParticipantResponse(ParticipantBase):
    id: int
    meeting_id: int
    joined_at: datetime

    class Config:
        from_attributes = True
