# OneCitizen: A Unified Digital Public Service Portal

> 🚀 **Powered by Fayda National ID** — OneCitizen is a smart governance portal leveraging Fayda as the sole method of citizen authentication for secure, streamlined access to government services.

---

## 👥 Contributors

- **Efa Tariku** (Solo Hackathon Participant)

> **Note**: Efa Tariku is a registered solo participant in the hackathon.

---

## 🧠 Project Overview

### 🚨 Problem Statement

Accessing government services in Ethiopia often involves:
- **Long queues** and mandatory physical visits to Woreda/Kebele offices
- **Paper-based records** prone to loss, duplication, or errors
- **No unified digital platform** for citizen-government interactions
- **Limited transparency** in tracking service request statuses

These inefficiencies lead to **delayed services**, **citizen frustration**, and **administrative bottlenecks**.

### 💡 Solution: OneCitizen

**OneCitizen** is a centralized digital platform designed to:
- Authenticate citizens securely using **Fayda National ID**
- Provide access to a wide range of digital government services (e.g., birth certificates, land records)
- Enable **real-time tracking** of service request statuses
- Offer a **backend portal** for government administrators to manage requests efficiently

By integrating Fayda, OneCitizen ensures **trust**, **privacy**, and **transparency** through role-based access and secure identity verification.

---

## 🔧 Core System Modules

### 1. Citizen Profile System
- Syncs key profile data from Fayda National ID
- Stores local user records tied to a unique Fayda UUID
- Allows editable fields like contact info and preferred language

### 2. Service Directory
- Lists all available government services with details (title, description, type, department, status)
- Organizes services into categories (e.g., Health, Legal, Transport)

### 3. Service Request System
- Enables citizens to submit service requests (e.g., land ownership certificate)
- Tracks request statuses: **Pending → In Progress → Completed**
- Allows admins to assign, review, and complete requests

### 4. Role-Based Dashboards
- **Citizen**: View personal data and request statuses
- **Admin (Department-Specific)**: Manage incoming requests
- **SuperAdmin**: Oversee users, departments, and system settings

### 5. Audit Logs & Notifications
- Logs all actions for transparency and accountability
- Sends real-time status updates to citizens via notifications

---

## 🎯 Expected Outcomes

By the end of the hackathon, OneCitizen aims to:
- Deliver a **working prototype** of the unified digital portal
- Simulate **real-world government service workflows**
- Demonstrate **Fayda integration** for secure authentication
- Lay the foundation for a scalable platform adoptable by the Ethiopian government

---

## 🧰 Technology Stack

### 🔧 Backend
- **Node.js (Express)**: RESTful API development
- **Prisma ORM**: Database modeling and management
- **PostgreSQL**: Relational database for citizen and service data
- **JWT**: Secure token-based session management
- **Supabase**: Authentication fallback and hosting (if needed)
- **Redis**: Caching for performance optimization

### 🎨 Frontend
- **Next.js**: React-based server-side rendering framework
- **Tailwind CSS**: Responsive and modern UI styling
- **ShadCN UI**: Pre-styled components for a polished interface
- **Axios**: Simplified API communication

### ☁️ Hosting & DevOps
- **Vercel**: Frontend deployment
- **Render**: Backend and PostgreSQL hosting
- **Neon**: Serverless PostgreSQL database

---

## 🪪 Fayda Integration

Fayda, Ethiopia’s National Digital ID system, is the **core enabler** of OneCitizen. Here’s why it’s critical:

- **Secure Authentication**: Citizens log in using their Fayda ID, ensuring verified access.
- **Tamper-Proof Identity**: Eliminates impersonation, fraud, and duplication.
- **Single Source of Truth**: Links all requests and transactions to a unique Fayda ID.
- **Transparency & Accountability**: Tracks every action, reducing corruption risks.
- **Government Alignment**: Fully supports Ethiopia’s digital transformation goals.

> **Why Fayda Matters**: Fayda isn’t just a feature—it’s the foundation of OneCitizen’s trust and scalability.

---

## ⚙️ Installation & Deployment

### 📦 Local Setup (Without Docker)

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/onecitizen.git
   cd onecitizen
   ```

2. **Install Dependencies**:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the `server/` directory:
     ```bash
     cp server/.env.example server/.env
     ```
   - Update `.env` with credentials for Fayda, database, and JWT secrets.

4. **Start the Database**:
   - Ensure PostgreSQL is running locally on port `5432`.

5. **Run the Backend**:
   ```bash
   cd server
   npx prisma generate
   npm run dev
   ```

6. **Run the Frontend**:
   In a new terminal:
   ```bash
   cd client
   npm run dev
   ```

7. **Access the Application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

### 🛠️ Useful Commands

#### Frontend (`client/` directory)
- `npm run dev`: Start Next.js in development mode
- `npm run build`: Build for production
- `npm run start`: Start production server

#### Backend (`server/` directory)
- `npm run dev`: Start Express server with hot reload
- `npm run start`: Start production server
- `npx prisma migrate dev`: Run database migrations
- `npx prisma studio`: Launch Prisma’s database browser

---

## 📝 Environment Variables

Refer to `.env.example` files in `client/` and `server/` for required variables (e.g., API URLs, database connection strings, JWT secrets).

---

## 💬 Contact

For questions, collaboration, or mentorship opportunities, contact:
- **Efa Tariku**: [efatariku07@email.com](mailto:efatariku07@email.com)