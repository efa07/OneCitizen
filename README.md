> 🚨 **Powered by Fayda National ID** — OneCitizen is a Smart Governance portal that uses Fayda as the sole method of citizen authentication.

# 📘 OneCitizen: A Unified Digital Public Service Portal

## 👥 Contributors

- Efa Tariku

> Note: Efa Tariku is a registered solo participant in the hackathon.

---

## 🧠 Project Synopsis

### 🚨 Problem Statement

Accessing government services in Ethiopia often involves:
- Long queues and physical visits to Woreda/Kebele offices
- Paper-based records that are prone to loss or duplication
- Lack of a unified digital interface for citizen–government interaction
- Limited traceability or transparency for citizens on request statuses

These inefficiencies contribute to **delayed services**, **citizen frustration**, and **administrative overload**.

---

### 💡 Planned Solution

**OneCitizen** is a centralized digital public service portal that:
- Authenticates citizens using their **Fayda National ID**
- Provides secure access to a variety of digital government services (e.g., birth certificate requests, land record inquiries, etc.)
- Allows citizens to **track the status** of requests in real-time
- Offers a backend portal for government admins to review and approve requests efficiently

All data access is role-restricted and secured via national ID verification to ensure trust, privacy, and transparency.

---

### Core System Modules 🔧

#### 1,Citizen Profile System (Core user data from Fayda)

    - Store + sync key profile info from Fayda login

    - Local user record tied to Fayda UUID

    - Editable fields: contact info, preferred language, etc.

### 2,Service Directory

    - All available government services

    - Each service = title, description, type, department, status

    - Group by categories like “Health”, “Legal”, “Transport”

### 3,Service Request System

    - Citizen can request a service (e.g., “Request Land Ownership Certificate”)

    - Each request has status: Pending → In Progress → Completed

    - Admins can assign, review, complete requests

### 4,Role-Based Dashboards

    - 🧍‍♂️Citizen: See own data & requests

    - 🧑‍💼Admin (per dept): Manage incoming requests

    - 🕵️‍♂️SuperAdmin: Can manage users, departments, system settings

### 5,Audit Logs + Notifications 
    - Log every action for transparency

    - Citizen gets status updates on their requests

### 🎯 Expected Outcome

By the end of the hackathon, OneCitizen will:
- Demonstrate a working prototype of the unified digital portal
- Simulate real-life government service workflows
- Showcase how Fayda integration streamlines authentication and trust
- Lay the groundwork for a scalable platform the Ethiopian government can adopt post-hackathon

---

## 🧰 Tech Stack

### 🔧 Backend
- **Node.js (express)** – RESTful API development
- **Prisma ORM** – Database modeling and access
- **PostgreSQL** – Relational database for citizen and service data
- **JWT** – Token-based session management
- **Supabase** – Hosting + auth fallback if needed
-  **Redis** -  for Caching

### 🎨 Frontend
- **Next.js** – React-based SSR frontend framework
- **Tailwind CSS** – Fast and responsive UI styling
- **ShadCN UI** – Pre-styled components for professional UI
- **Axios** – API calls

### ☁️ Hosting/DevOps
- **Vercel** – Frontend deployment
- **Render** – Backend + PostgreSQL hosting
- **Neon** - serverless Postgres DB

### 🪪 Fayda’s Role

Fayda, Ethiopia’s National Digital ID system, is the **core enabler** of the OneCitizen platform.

Here’s how it’s integrated and why it matters:

- **Primary Authentication Method**: Citizens log in using their Fayda ID, ensuring trusted, verified access to all services.
- **Secure Identity Layer**: Fayda provides a **tamper-proof identity** layer that eliminates impersonation, fraud, and duplication.
- **Single Source of Truth**: With Fayda, OneCitizen links every request, update, and transaction to a **nationally recognized identity**.
- **Data Integrity & Accountability**: Every service request or update is traceable to a unique Fayda ID — reducing corruption and enhancing transparency.
- **Government Integration-Ready**: Because Fayda is a government-standard, OneCitizen is fully aligned with national digital transformation goals.

> Without Fayda, OneCitizen wouldn’t be possible. It’s not just “part” of the app — it *is* the foundation.


---

## Installation and Deployment

### 🔧 Local Setup (No Docker)

1. **Clone the repo**:
```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
```

2. **Install dependencies for both backend and frontend**:
```bash
cd server
npm install
cd ../client
npm install````
```
3.**Set up environment variables**:
*Create .env inside the server/ directory using the example:
```bash
cp .env.example .env
```
*Update it with your actual credentials for Fayda integration, DB, etc.

4. **Start the database (if running locally, outside Docker)**:
*Make sure PostgreSQL is running on port 5432.
5. **Run backend**:
```bash
cd server
npx prisma generate
npm run dev
```
6. **Run frontend**:
*In another terminal window:
```bash
cd client
npm run dev
```
7. **Access the app**:
    *Frontend: http://localhost:3000

    *Backend API: http://localhost:5000
    
### ⚙️ Useful Commands

- **Frontend** (from `client/`):
  - `npm run dev` — Start Next.js in development mode
  - `npm run build` — Build for production
  - `npm run start` — Start production server

- **Backend** (from `server/`):
  - `npm run dev` — Start Express server with hot reload
  - `npm run start` — Start server in production
  - `npx prisma migrate dev` — Run DB migrations
  - `npx prisma studio` — Open Prisma DB browser

---

### 📝 Environment Variables

- See `.env.example` files in both `client/` and `server/` for required variables (API URLs, DB connection, JWT secrets, etc).

---


---

## 💬 Contact

For questions, collaboration, or mentorship opportunities, feel free to reach out to:
**Efa Tariku** — efatariku07@email.com
