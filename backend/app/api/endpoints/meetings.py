from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.schemas.meeting import (
    MeetingCreate,
    MeetingSchedule,
    MeetingJoin,
    MeetingUpdate,
    MeetingResponse,
    MeetingListResponse,
)
from app.schemas.participant import ParticipantCreate
from app.services.meeting_service import MeetingService
from app.services.participant_service import ParticipantService
from app.db.session import get_db

router = APIRouter()


@router.post("/new", response_model=MeetingResponse, status_code=status.HTTP_201_CREATED)
def create_meeting(
    meeting_data: MeetingCreate,
    db: Session = Depends(get_db)
):
    """Create a new instant meeting."""
    try:
        service = MeetingService(db)
        return service.create_meeting(meeting_data)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create meeting: {str(e)}"
        )


@router.post("/schedule", response_model=MeetingResponse, status_code=status.HTTP_201_CREATED)
def schedule_meeting(
    meeting_data: MeetingSchedule,
    db: Session = Depends(get_db)
):
    """Schedule a new meeting for a future date/time."""
    try:
        service = MeetingService(db)
        return service.schedule_meeting(meeting_data)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to schedule meeting: {str(e)}"
        )


@router.post("/join", response_model=MeetingResponse)
def join_meeting(
    join_data: MeetingJoin,
    db: Session = Depends(get_db)
):
    """Join an existing meeting by meeting ID."""
    try:
        meeting_service = MeetingService(db)
        participant_service = ParticipantService(db)
        
        meeting = meeting_service.get_meeting_by_meeting_id(join_data.meeting_id)
        if not meeting:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Meeting not found"
            )
        
        if not meeting.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Meeting is not active"
            )
        
        participant_data = ParticipantCreate(
            meeting_id=meeting.id,
            display_name=join_data.display_name
        )
        participant_service.create_participant(participant_data)
        
        return meeting
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to join meeting: {str(e)}"
        )


@router.get("/upcoming", response_model=List[MeetingListResponse])
def get_upcoming_meetings(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get upcoming scheduled meetings."""
    try:
        service = MeetingService(db)
        return service.get_upcoming_meetings(skip, limit)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch upcoming meetings: {str(e)}"
        )


@router.get("/recent", response_model=List[MeetingListResponse])
def get_recent_meetings(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get recent completed meetings."""
    try:
        service = MeetingService(db)
        return service.get_recent_meetings(skip, limit)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch recent meetings: {str(e)}"
        )


@router.get("/{meeting_id}", response_model=MeetingResponse)
def get_meeting(
    meeting_id: int,
    db: Session = Depends(get_db)
):
    """Get a meeting by its database ID."""
    try:
        service = MeetingService(db)
        meeting = service.get_meeting(meeting_id)
        if not meeting:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Meeting not found"
            )
        return meeting
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch meeting: {str(e)}"
        )


@router.delete("/{meeting_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_meeting(
    meeting_id: int,
    db: Session = Depends(get_db)
):
    """Delete a meeting by its database ID."""
    try:
        service = MeetingService(db)
        if not service.delete_meeting(meeting_id):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Meeting not found"
            )
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete meeting: {str(e)}"
        )
