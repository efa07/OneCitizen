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

### 🎯 Expected Outcome

By the end of the hackathon, OneCitizen will:
- Demonstrate a working prototype of the unified digital portal
- Simulate real-life government service workflows
- Showcase how Fayda integration streamlines authentication and trust
- Lay the groundwork for a scalable platform the Ethiopian government can adopt post-hackathon

---

## 🧰 Tech Stack

### 🔧 Backend
- **Node.js (Fastify)** – RESTful API development
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

## 💬 Contact

For questions, collaboration, or mentorship opportunities, feel free to reach out to:
**Efa Tariku** — efatariku07@email.com
