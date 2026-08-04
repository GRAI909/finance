# Rai Financial Services - Multi-Bank DSA Personal Loan Desk

A modern full-stack web application for DSA (Direct Sales Agent) personal loan desk operations, based on the design and feature workflow of `https://gaurav-follows.netlify.app/`. Features complete JWT Authentication, Role-Based Access Control (RBAC), Admin Management System, Glassmorphism UI, MongoDB persistence, and Docker support.

---

## 🚀 Key Features

### 1. User Authentication & Security
- **JWT Authentication** with persistent sessions.
- **bcrypt Password Hashing** for robust security.
- **Role-Based Access Control (RBAC)**: `Admin` and `User` roles.
- Protected API routes, Helmet security headers, rate limiting, and CORS.

### 2. Default Seed Admin Credentials
The backend automatically creates a default Admin account on startup if it does not already exist:
- **Name**: `Gaurav`
- **Username**: `gaurav1`
- **Password**: `Grai0098`
- **Role**: `Admin`

### 3. Admin Management Dashboard (`Admin` Role)
- **Dashboard Overview**: Metrics for Total Users, Active Users, Disabled Users, Active Sessions, and System Activity Logs.
- **User Directory**: Search and filter users by Name, Username, Email, Role, and Status.
- **User CRUD Operations**: Add new users, edit existing user details, toggle Enable/Disable status, reset user passwords, view complete profile details.
- **Data Export**: Export user database to CSV format (`/api/users?exportCsv=true`).
- **Activity & Audit Logs**: Detailed table tracking user logins, lead creation/updates, profile changes, and administrative actions.

### 4. DSA Personal Loan Sales Suite (`User` & `Admin` Roles)
- **Dashboard Overview**: KPI cards for Active Pipeline, Callbacks Today, Monthly Disbursed Amount, and monthly target progress bar (₹50 Lakhs target).
- **Lead Pipeline Kanban**: Drag-and-drop / stage management columns (New, Contacted, Docs Collected, Login Completed, Sanctioned, Disbursed, Rejected).
- **All Leads Table**: Full searchable data table with bank filter, inline status editor, 1-tap dialer, and direct WhatsApp launcher.
- **15 Bank Policies & Docs**: Credit policy matrix for top 15 Indian banks/NBFCs (Bajaj Finance, HDFC, ICICI, Axis, SBI, IDFC FIRST, Kotak, Tata Capital, L&T Finance, etc.).
- **Smart Bank Matcher Tool**: Interactive calculator matching applicant salary, CIBIL score, existing EMIs, and employer category to find eligible bank policies.
- **Callbacks & Schedule**: Follow-up reminder manager with urgent top banner alerts when a callback is due.
- **Loan Calculators**: Interactive EMI Calculator with sliders & amortization chart, FOIR eligibility calculator, and Balance Transfer calculator.
- **WhatsApp Scripts**: Pre-written high-converting DSA pitch message templates with 1-click copy and instant WhatsApp opening.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, FontAwesome Icons, Axios, Context API.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose ODM, JWT, bcryptjs, Helmet, Express-Rate-Limit.
- **Deployment**: Docker, Docker Compose, Nginx.

---

## 📁 Project Structure

```
GAURAV/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Modals/
│   │   │   │   ├── AddLeadModal.jsx
│   │   │   │   ├── UserModal.jsx
│   │   │   │   ├── ResetPasswordModal.jsx
│   │   │   │   └── ViewUserModal.jsx
│   │   │   ├── Views/
│   │   │   │   ├── DashboardView.jsx
│   │   │   │   ├── PipelineView.jsx
│   │   │   │   ├── AllLeadsView.jsx
│   │   │   │   ├── PoliciesView.jsx
│   │   │   │   ├── MatcherToolView.jsx
│   │   │   │   ├── CallbacksView.jsx
│   │   │   │   ├── CalculatorsView.jsx
│   │   │   │   ├── ScriptsView.jsx
│   │   │   │   ├── ProfileView.jsx
│   │   │   │   └── AdminDashboardView.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TopHeader.jsx
│   │   │   └── UrgentBanner.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── leadController.js
│   │   ├── profileController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── rbacMiddleware.js
│   ├── models/
│   │   ├── ActivityLog.js
│   │   ├── Lead.js
│   │   ├── Session.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── leadRoutes.js
│   │   ├── profileRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── activityLogger.js
│   │   └── seedAdmin.js
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── docker-compose.yml
└── README.md
```

---

## ⚡ Local Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or MongoDB Atlas connection string)

### 1. Setup Backend (`server/`)
```bash
cd server
npm install
```
Create a `.env` file in `server/` (copied from `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/rai_financial
JWT_SECRET=super_secret_jwt_key_rai_financial_2026_dsa
JWT_EXPIRE=24h
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```
Run backend server:
```bash
npm run dev
```

### 2. Setup Frontend (`client/`)
```bash
cd ../client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🐳 Docker Deployment

Run the entire application (MongoDB + Backend Server + Frontend Client) with Docker Compose:

```bash
docker-compose up --build
```
Access the application at `http://localhost`.

---

## 🔌 API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/login` - Authenticate user & get JWT token
- `POST /api/auth/logout` - End user session
- `GET /api/auth/me` - Get active authenticated user details

### User Profile (`/api/profile`)
- `GET /api/profile` - View logged-in user profile
- `PUT /api/profile` - Update name and email
- `PUT /api/profile/change-password` - Change account password

### Users Management - Admin Only (`/api/users`)
- `GET /api/users` - List all users (supports `search`, `role`, `status`, and `exportCsv=true`)
- `POST /api/users` - Create new user account
- `PUT /api/users/:id` - Update user details, role, or status
- `DELETE /api/users/:id` - Permanently delete user
- `PUT /api/users/:id/reset-password` - Reset user password

### Admin Analytics & Audit Logs (`/api/admin`)
- `GET /api/admin/dashboard` - Get system overview stats & recently logged in users
- `GET /api/admin/logs` - Fetch paginated activity logs

### DSA Leads (`/api/leads`)
- `GET /api/leads` - List leads with filters
- `POST /api/leads` - Add new loan lead
- `PUT /api/leads/:id` - Update lead status or details
- `DELETE /api/leads/:id` - Delete lead
