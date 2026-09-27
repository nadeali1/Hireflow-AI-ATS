# HireFlow

HireFlow is a job application tracker. It lets you log the roles you've applied
to, follow their status through the hiring pipeline, and check how well your
resume matches a specific job description using an AI-powered analysis.

Built as a MERN-stack portfolio project.

## Features

- Email/password authentication with hashed passwords and JWT sessions
- Dashboard with pipeline stats and a status breakdown chart
- Full CRUD for job applications: company, role, location, type, salary,
  status, notes, job link
- Search and status filtering across applications
- Resume upload (PDF), stored per account and reusable across analyses
- AI Resume Analyzer: paste a job description and get an ATS compatibility
  score, matching/missing skills, resume strengths, improvement suggestions,
  and a keyword-by-keyword breakdown
- Editable profile (contact details, title, LinkedIn, GitHub, portfolio)
- Fully responsive layout — sidebar navigation collapses to a mobile drawer,
  tables become cards on small screens
- Light theme only, single consistent color system throughout

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Recharts,
Lucide icons

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer,
pdf-parse

**AI:** Google Gemini API (`gemini-1.5-flash`), called only from the backend

## Project Structure

```
hireflow/
├── backend/
│   ├── src/
│   │   ├── config/        # Database connection
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth, upload, error handling
│   │   ├── models/        # Mongoose schemas (User, Application, Resume)
│   │   ├── routes/        # Express routers
│   │   ├── services/      # Gemini AI integration
│   │   └── utils/         # JWT helper
│   ├── uploads/resumes/   # Uploaded resume PDFs (gitignored)
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI building blocks
    │   ├── context/       # Auth context
    │   ├── pages/         # Route-level pages
    │   └── services/      # Axios instance
    └── .env.example
```

## Installation

Clone the repo, then set up each side separately.

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hireflow
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
```

Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
Without it, every other feature still works — only the AI Analyzer page will
return a "not available" message until the key is added.

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

`.env`:

```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

The app runs on `http://localhost:5173`.

## Environment Variables

| File | Variable | Description |
|---|---|---|
| backend/.env | `PORT` | Port the API listens on |
| backend/.env | `MONGODB_URI` | MongoDB connection string |
| backend/.env | `JWT_SECRET` | Secret used to sign JWTs |
| backend/.env | `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| backend/.env | `GEMINI_API_KEY` | Google Gemini API key, used only server-side |
| backend/.env | `CLIENT_URL` | Frontend origin, used for CORS |
| frontend/.env | `VITE_API_URL` | Base URL of the backend API |

No key ever needs to be placed in the frontend or committed to the repo.

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Get the current user |
| GET | `/api/applications` | List applications (supports `search`, `status`) |
| POST | `/api/applications` | Create an application |
| GET | `/api/applications/:id` | Get one application |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |
| GET | `/api/applications/stats/dashboard` | Dashboard stats + recent applications |
| GET | `/api/resume` | Get the current resume's metadata |
| POST | `/api/resume` | Upload/replace resume (multipart, field `resume`) |
| DELETE | `/api/resume` | Delete the resume |
| GET | `/api/resume/download` | Download the resume file |
| POST | `/api/ai/analyze` | Analyze resume against a pasted job description |
| PUT | `/api/profile` | Update profile fields |

All routes except register/login require an `Authorization: Bearer <token>`
header.

## Screenshots

_Add screenshots of the landing page, dashboard, applications list, and AI
analyzer here once the app is running._

## Future Improvements

- Email notifications for interview reminders
- Kanban-style drag-and-drop board for application statuses
- Multiple resume versions per account
- Export applications to CSV
- Team/shared tracking for career centers or bootcamps

## License

This project is available for personal and portfolio use.
