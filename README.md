# Scaler Meetings - Zoom-inspired Video Conferencing Platform

A production-quality **Zoom-inspired Video Conferencing Platform** built as part of the **Scaler AI Labs Software Engineering Internship Assignment**.

---

## 🚀 Live Demo

- **🌐 Frontend (Vercel):** https://scaler-video-conferencing-platform.vercel.app
- **⚙️ Backend API (Render):** https://scaler-video-conferencing-platform.onrender.com
- **📚 API Documentation (Swagger):** https://scaler-video-conferencing-platform.onrender.com/docs

---

## 📖 Overview

Scaler Meetings is a modern video conferencing platform inspired by Zoom. It enables users to:

- Create instant meetings
- Schedule meetings
- Join meetings using a Meeting ID
- View upcoming meetings
- View recent meetings
- Manage meetings through a clean dashboard

The project follows clean architecture principles using **Repository Pattern**, **Service Layer**, and **SOLID Principles** while maintaining a scalable codebase.

---

# 🛠 Tech Stack

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic v2
- Alembic
- Uvicorn

## Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- TailwindCSS
- shadcn/ui
- Axios
- React Hook Form
- Zod
- Lucide React

---

# 🏗 Architecture

The project follows a layered architecture.

```
Client
   │
   ▼
Next.js Frontend
   │
Axios API Calls
   │
   ▼
FastAPI Backend
   │
Service Layer
   │
Repository Layer
   │
SQLite Database
```

### Backend Design Principles

- Repository Pattern
- Service Layer
- SOLID Principles
- Dependency Injection
- Modular API Design

---

# 📂 Project Structure

```
scaler-video-conferencing-platform/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── endpoints/
│   │   │   └── deps.py
│   │   ├── core/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── public/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

# ✨ Features

## Dashboard

- Welcome Dashboard
- Upcoming Meetings
- Recent Meetings
- Refresh Meetings
- Responsive UI

---

## Instant Meeting

- Create meeting instantly
- Auto-generated Meeting ID
- Redirect to meeting room

---

## Schedule Meeting

- Meeting title
- Host name
- Description
- Date selection
- Time selection
- Duration

---

## Join Meeting

- Join using Meeting ID
- Display name support

---

## Meeting Room

- Meeting Information
- Invite Link
- Participants (UI)
- Chat Placeholder
- Mute Button (UI)
- Camera Button (UI)
- Leave Meeting Button

---

# 📡 REST API

## Meetings

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/meetings/new` | Create Instant Meeting |
| POST | `/api/meetings/schedule` | Schedule Meeting |
| POST | `/api/meetings/join` | Join Meeting |
| GET | `/api/meetings/upcoming` | Get Upcoming Meetings |
| GET | `/api/meetings/recent` | Get Recent Meetings |
| GET | `/api/meetings/{meeting_id}` | Get Meeting Details |
| DELETE | `/api/meetings/{meeting_id}` | Delete Meeting |

Swagger Documentation:

```
https://scaler-video-conferencing-platform.onrender.com/docs
```

---

# ⚙️ Backend Setup

## Clone Repository

```bash
git clone https://github.com/Aditya031122/scaler-video-conferencing-platform.git

cd scaler-video-conferencing-platform
```

---

## Backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate environment

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create environment variables

```bash
cp .env.example .env
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

# 💻 Frontend Setup

Go to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create environment

```bash
cp .env.example .env.local
```

Set

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run frontend

```bash
npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

# 🌍 Deployment

## Frontend

Platform

```
Vercel
```

URL

```
https://scaler-video-conferencing-platform.vercel.app
```

---

## Backend

Platform

```
Render
```

URL

```
https://scaler-video-conferencing-platform.onrender.com
```

Swagger

```
https://scaler-video-conferencing-platform.onrender.com/docs
```

---

# 🧪 Testing

Backend

```bash
pytest
```

---

# 📌 Development Notes

- Authentication is intentionally omitted as per assignment requirements.
- WebRTC video/audio streaming is outside the assignment scope.
- Socket.io is not implemented.
- Uses SQLite as the database.
- Follows Repository Pattern and Service Layer architecture.
- Built with scalability and clean code principles in mind.

---

# 🚀 Future Improvements

- User Authentication
- JWT Authorization
- OAuth Login
- Real-time Chat
- WebRTC Video Calling
- Screen Sharing
- Recording Meetings
- Participant Management
- Notifications
- Email Invitations

---

# 👨‍💻 Author

**Aditya**

GitHub:
https://github.com/Aditya031122

---

# 📄 License

This project was developed as part of the **Scaler AI Labs Software Engineering Internship Assignment**.