from datetime import datetime, timedelta
from app.db.session import SessionLocal, engine, Base
from app.models.meeting import Meeting
from app.models.participant import MeetingParticipant


def seed_database():
    """Seed the database with sample data."""
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Clear existing data
        db.query(MeetingParticipant).delete()
        db.query(Meeting).delete()
        db.commit()
        
        # Sample meetings
        now = datetime.utcnow()
        
        # Active instant meeting
        meeting1 = Meeting(
            meeting_id="abc-123-def",
            title="Daily Standup",
            description="Team daily standup meeting",
            host_name="John Doe",
            is_active=True,
            created_at=now - timedelta(hours=1)
        )
        db.add(meeting1)
        db.flush()
        
        # Participants for meeting 1
        participant1 = MeetingParticipant(
            meeting_id=meeting1.id,
            display_name="Alice Smith",
            is_muted=False,
            is_camera_on=True
        )
        participant2 = MeetingParticipant(
            meeting_id=meeting1.id,
            display_name="Bob Johnson",
            is_muted=True,
            is_camera_on=False
        )
        db.add_all([participant1, participant2])
        
        # Scheduled upcoming meeting
        meeting2 = Meeting(
            meeting_id="xyz-789-uvw",
            title="Sprint Planning",
            description="Sprint planning for next iteration",
            host_name="Jane Smith",
            scheduled_date=now + timedelta(days=2),
            scheduled_time="10:00",
            duration=60,
            is_active=True,
            created_at=now - timedelta(days=1)
        )
        db.add(meeting2)
        
        # Another upcoming meeting
        meeting3 = Meeting(
            meeting_id="def-456-ghi",
            title="Product Review",
            description="Quarterly product review",
            host_name="Mike Wilson",
            scheduled_date=now + timedelta(days=5),
            scheduled_time="14:00",
            duration=90,
            is_active=True,
            created_at=now - timedelta(days=2)
        )
        db.add(meeting3)
        
        # Recent completed meeting
        meeting4 = Meeting(
            meeting_id="ghi-321-jkl",
            title="Client Demo",
            description="Demo for client presentation",
            host_name="Sarah Brown",
            scheduled_date=now - timedelta(days=3),
            scheduled_time="11:00",
            duration=45,
            is_active=False,
            created_at=now - timedelta(days=4)
        )
        db.add(meeting4)
        db.flush()
        
        # Participants for completed meeting
        participant3 = MeetingParticipant(
            meeting_id=meeting4.id,
            display_name="Client Representative",
            is_muted=False,
            is_camera_on=True
        )
        db.add(participant3)
        
        # Another recent completed meeting
        meeting5 = Meeting(
            meeting_id="jkl-654-mno",
            title="Training Session",
            description="New technology training",
            host_name="David Lee",
            scheduled_date=now - timedelta(days=7),
            scheduled_time="09:00",
            duration=120,
            is_active=False,
            created_at=now - timedelta(days=8)
        )
        db.add(meeting5)
        
        db.commit()
        
        print("✅ Database seeded successfully!")
        print(f"✅ Created 5 meetings")
        print(f"✅ Created 3 participants")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding database: {str(e)}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
