# 🌾 Kigali Harvest  School

A full-stack **Next.js + PostgreSQL + Drizzle ORM** application for managing  announcements, gallery, and users in a school system.

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Database | PostgreSQL + Drizzle ORM |
| Auth | JWT (Access + Refresh Tokens) |
| Storage | Cloudinary (image uploads) |
| Deployment | Docker |

---

##  User Roles

### 👑 Headmaster
- Full system access
- Manage all users (create, update, delete)
- Assign and change user roles
- Verify or unverify user accounts

### 👨 Teacher
- Access own data only
- Cannot modify roles or verification status
- Restricted API access

---

##  Core Features

- **Authentication** — JWT-based login with access + refresh tokens
- **Role-Based Access Control** — Role always validated from the database
- **User Management** — Full CRUD for headmaster; self-access only for teachers
- **Announcements** — Create and manage school-wide announcements
- **Gallery** — Image uploads and management via Cloudinary
- **Pagination & Filters** — Applied across all list endpoints

---

## Project Structure

```
app/              → Next.js routes (frontend + API)
   /app 
lib/
  db/             → Database config (Drizzle)
  services/       → Business logic
  repositories/   → Database queries
  utils/          → Auth helpers + utilities
components/       → UI components
public/           → Static assets
```

---

##  Database

Uses **PostgreSQL** with **Drizzle ORM**.

| Table | Purpose |
|---|---|
| `users` | Accounts, roles, verification |
| `announcements` | School announcements |
| `gallery` | Image metadata + Cloudinary URLs |
| `testimonials` | User-submitted testimonials |

---

##  Authentication

| Token | Lifetime | Storage |
|---|---|---|
| Access Token | 1 day | Response body |
| Refresh Token | 7 days | HTTP-only cookie |



---

##  Cloudinary

Used for uploading and serving:
- Gallery images
- Background images

**Required environment variables:**

```
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

---

##  Security Rules

- Role is validated from the database on every protected request
- Teachers cannot access admin-level endpoints
- Only the `Headmaster` role has admin privileges

---

##  Getting Started

See [`deployment.md`](./deployment.md) for full setup instructions — including Docker, manual setup, and database migrations.