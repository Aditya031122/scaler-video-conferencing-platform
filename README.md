# Scaler Meetings - Zoom-inspired Video Conferencing Platform

A production-quality video conferencing platform built as a Software Engineering Internship assignment for Scaler AI Labs.

## Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs with Python
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **Pydantic v2** - Data validation using Python type annotations
- **Alembic** - Database migration tool

### Frontend
- **Next.js 15 App Router** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **React Hook Form** - Performant form library
- **Axios** - HTTP client
- **Zod** - TypeScript-first schema validation
- **Lucide React** - Beautiful icon library

## Architecture

### Backend Architecture
- **Repository Pattern** - Data access abstraction layer
- **Service Layer** - Business logic separation
- **SOLID Principles** - Clean, maintainable code structure

### Project Structure

```
scaler-meetings/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── endpoints/    # API route handlers
│   │   │   └── deps.py      # Dependencies
│   │   ├── core/            # Configuration and security
│   │   ├── db/              # Database session management
│   │   ├── models/          # SQLAlchemy models
│   │   ├── repositories/    # Data access layer
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic layer
│   │   └── main.py          # FastAPI application
│   ├── tests/               # Test files
│   ├── alembic/             # Database migrations
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # React components
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── lib/             # Utility functions
│   │   └── types/           # TypeScript type definitions
│   ├── public/              # Static assets
│   ├── package.json         # Node.js dependencies
│   └── .env.example         # Environment variables template
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create environment file:
```bash
cp .env.example .env
```

6. Run the backend server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Features

### Dashboard
- Navbar with navigation
- Profile placeholder
- Settings placeholder
- New Meeting button
- Join Meeting button
- Schedule Meeting button
- Upcoming Meetings list
- Recent Meetings list

### Instant Meeting
- Create instant meeting
- Generate unique Meeting ID
- Generate invite link

### Join Meeting
- Join by Meeting ID
- Enter display name

### Schedule Meeting
- Meeting title
- Description
- Date selection
- Time selection
- Duration selection

### Meeting Room
- Meeting header with meeting details
- Participants list
- Copy invite link
- Chat placeholder
- Mute button (UI)
- Camera button (UI)
- Leave button

## API Endpoints

### Meetings
- `POST /api/meetings/` - Create a new meeting
- `GET /api/meetings/{meeting_id}` - Get meeting by ID
- `GET /api/meetings/meeting-id/{meeting_id}` - Get meeting by meeting ID
- `GET /api/meetings/` - Get all meetings
- `GET /api/meetings/active/list` - Get active meetings
- `PUT /api/meetings/{meeting_id}` - Update meeting
- `DELETE /api/meetings/{meeting_id}` - Delete meeting

## Development Notes

- Authentication, login, signup, JWT, OAuth are not implemented (as per requirements)
- WebRTC, Socket.io, video streaming, audio streaming are not implemented (as per requirements)
- Assumes one default logged-in user
- Uses SQLite database
- Follows SOLID principles
- Implements Repository Pattern and Service Layer

## License

This project is part of the Scaler AI Labs Internship Program.
