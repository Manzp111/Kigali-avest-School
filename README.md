#  Kigali Harvest School

A full-stack school management platform built with **Next.js**, **PostgreSQL**, and **Drizzle ORM** — powering announcements, a media gallery, and role-based administration.

 **Live App:** [kigalihavestschool.vercel.app](https://kigalihavestschool.vercel.app) or anather domain or localhost

---

##  Table of Contents

- 1.[Tech Stack](#tech-stack)
- 2.[User Roles](#user-roles)
- 3.[Features](#features)
- 4.[Project Structure](#project-structure)
- 5.[Database Schema](#database-schema)
- 6.[Authentication](#authentication)
- 7.[Routes Overview](#routes-overview)
- 8.[Environment Variables](#environment-variables)
- 9.[Security](#security)
- 10.[Getting Started](#getting-started)

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Authentication | JWT (Access + Refresh Tokens) |
| Storage | Cloudinary |
| Deployment | Docker + Vercel | or oter hosting platform 

---

## 2.  User Roles

###  Headmaster
- Full system control
- Manage users —  update, delete
- Assign and modify roles (Headmaster / Teacher)
- Verify or unverify accounts


###  Teacher
- Access and update personal data only and all announcement and scool gallery
- Cannot modify roles or verification status
- Restricted API permissions

---

## 3.  Features

### Authentication
- JWT-based with Access + Refresh tokens
- HTTP-only cookie storage for refresh tokens
- Token rotation on refresh

###  Role-Based Access Control
- Roles validated from the database on every request
- Strict separation between admin and teacher capabilities

###  User Management
- Full CRUD operations (Headmaster only)
- Teachers can view and update their own profile

###  Announcements
- Create and manage school-wide announcements

###  Gallery
- Image uploads via Cloudinary
- Metadata and URL storage in the database

### Pagination & Filtering
- Applied across all list endpoints for performance at scale

---

## 4.Project Structure

```
├── app/
│   ├── api/              # Backend API routes
│   └── ...               # Next.js page routes
├── lib/
│   ├── db/               # Drizzle database configuration
│   ├── services/         # Business logic layer
│   ├── repositories/     # Database query layer
│   └── utils/            # Helpers (auth, tokens, etc.)
├── components/           # Reusable UI components
└── public/               # Static assets
```

---

##  5.Database Schema

| Table | Description |
|---|---|
| `users` | User accounts, roles, and verification status |
| `announcements` | School-wide announcements |
| `gallery` | Image metadata and Cloudinary URLs |


---

##  6.Authentication

| Token | Lifetime | Storage |
|---|---|---|
| Access Token | 1 day | Response body |
| Refresh Token | 7 days | HTTP-only cookie |

---

##  7.Routes Overview

| Route | Description | Access |
|---|---|---|
| `/` | Homepage | Public |
| `/login` | Login page | Public |
| `/signup` | User registration | Public |
| `/gallery` | School photo gallery | Public |
| `/admin` | Admin dashboard | Headmaster && teacher only  |

---

## 8.Environment Variables

### Cloudinary

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

> Cloudinary is used for gallery image uploads and background images.

---

##  9.Security

- Roles are **always validated from the database** — never from token claims alone
- Teachers **cannot access admin endpoints**, enforced at the API level
- Only Headmasters can manage users, assign roles, or modify verification status

---

## 10. Getting Started

For full setup instructions including Docker configuration, database migrations, and environment setup:

 See [deployment.md](./deployment.md)
