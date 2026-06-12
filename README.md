# Sahayak - AI-Powered School Portal

A full-stack web portal for schools that gives teachers AI-powered tools for content generation, syllabus tracking, attendance, and worksheet submissions — with a separate admin panel for managing teachers and students.

---

## Features

### Teacher Portal
- **Syllabus Tracker** - Track chapters subject-by-subject, mark completed topics
- **AI Content Generator** - Upload PDF lecture notes, generate summaries, subjective questions, or MCQs using Google Gemini
- **Attendance** - Mark and save daily student attendance
- **Worksheet Submissions** - Review student worksheet submissions per chapter
- **Report Cards** - View student performance reports

### Admin Panel
- Add teachers manually or via CSV bulk upload
- Assign teachers to classes, sections, and subjects
- Assign class teachers (in-charge) to sections
- Upload student data via CSV
- View all teachers and students
- Generate student report cards

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vanilla HTML, CSS, JavaScript |
| Backend | Node.js, Express.js (ESM) |
| Database | PostgreSQL |
| AI | Google Gemini API (`@google/genai`) |
| Auth | JWT (`jsonwebtoken`) + bcrypt |
| File uploads | Multer |
| PDF generation | PDFKit |
| Email | Nodemailer / Resend |

---

## Project Structure

```
├── backend/
│   ├── controllers/        # Route handlers (admin, teacher, syllabus, attendance, etc.)
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/             # Express routers
│   └── server.js           # Entry point
│
└── frontend/
    └── public/
        ├── index.html              # Landing page
        ├── style.css               # Global design system
        ├── components/
        │   ├── navbar.html         # Teacher sidebar
        │   └── navbar-admin.html   # Admin sidebar
        ├── pages/
        │   ├── teacher-login.html
        │   ├── teacher-dashboard.html
        │   ├── syllabus-detail.html
        │   ├── content-generation.html
        │   ├── attendance.html
        │   ├── worksheet-submissions.html
        │   ├── admin-login.html
        │   ├── admin-dashboard.html
        │   ├── admin-add-teacher.html
        │   ├── admin-assign-teacher.html
        │   ├── admin-assign-class-teacher.html
        │   ├── admin-upload-students.html
        │   ├── admin-view-teachers.html
        │   └── admin-view-students.html
        └── scripts/                # Page-specific JS files
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL database

### 1. Clone the repo

```bash
git clone <repo-url>
cd PowerRangers_Sahayak_Code
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/sahayak
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3. Start the server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The app will be available at `http://localhost:3000`.

> The backend serves the frontend static files directly — no separate frontend server needed.

---

## Demo Credentials

### Admin
| Field | Value |
|-------|-------|
| Email | admin1@example.com |
| Password | securepassword123 |

### Teachers
| Name | Email | Password |
|------|-------|----------|
| Rohit Kapoor | rohit.kapoor@school.com | hashedpw1 |
| Anjali Singh | anjali.singh@school.com | hashedpw2 |
| Vikas Nair | vikas.nair@school.com | hashedpw3 |
| Meera Bhat | meera.bhat@school.com | hashedpw4 |
| Kiran Patel | kiran.patel@school.com | hashedpw5 |
| Suresh Reddy | suresh.reddy@school.com | hashedpw6 |
| Rina Das | rina.das@school.com | hashedpw7 |

> On the login pages, use the **"Use demo credentials"** button to auto-fill.

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/login` | Teacher login |
| POST | `/api/auth/admin/login` | Admin login |
| GET | `/api/teacher/...` | Teacher data endpoints |
| GET/POST | `/api/syllabus/...` | Syllabus tracker |
| GET/POST | `/api/attendance/...` | Attendance |
| POST | `/api/content/generate` | AI content generation |
| GET/POST | `/api/submissions/...` | Worksheet submissions |
| GET/POST | `/api/admin/...` | Admin management |
| GET | `/api/reports/...` | Report cards |
