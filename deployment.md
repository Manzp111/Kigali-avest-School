#  Deployment Guide – Kigali Harvest School

This guide covers everything needed to deploy the system — via Docker (recommended) or manual setup.

---

##  Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://user:password@db:5432/mydb

JWT_SECRET=change_me
JWT_ACCESS_SECRET=change_me
JWT_REFRESH_SECRET=change_me

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=production
```



---

##  Docker Setup (Recommended)

**Start the application:**

```bash
docker build -t image_name .
docker run -p 3000:3000 --env-file .env image

```

---

## Database Setup

You have two options: use Drizzle ORM migrations, or create tables manually with raw SQL.

### Option A — Drizzle ORM (we used this)

| Command | Purpose |
|---|---|
| `npx drizzle-kit generate` | Generate migration files from  schema.ts |
| `npx drizzle-kit push` | Push schema directly to the database |

### Option B — Manual SQL

If you prefer to create tables directly, run the following in PostgreSQL client.

**Prerequisites**

Enable UUID generation (required if not already active):

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

**Enums**

```sql
CREATE TYPE user_role AS ENUM ('Headmaster', 'teacher');
CREATE TYPE image_type AS ENUM ('background', 'gallery');
```

**Users**

```sql
CREATE TABLE users (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name  TEXT,
  last_name   TEXT,
  email       TEXT NOT NULL UNIQUE,
  phone       TEXT NOT NULL UNIQUE,
  password    TEXT NOT NULL,
  role        user_role DEFAULT 'teacher',
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX users_email_idx ON users(email);
```

**Announcements**

```sql
CREATE TABLE announcements (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  message      TEXT NOT NULL,
  image_url    TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  user_id      TEXT,
  created_at   TIMESTAMP DEFAULT NOW(),
  updated_at   TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_announcements_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX announcements_user_idx ON announcements(user_id);
```

**Gallery**

```sql
CREATE TABLE gallery (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  subtitle   TEXT,
  image_url  TEXT NOT NULL,
  public_id  TEXT NOT NULL,
  type       image_type DEFAULT 'gallery',
  published  BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX gallery_type_idx ON gallery(type);
```

**Testimonials**

```sql
CREATE TABLE testimonials (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  email        TEXT,
  message      TEXT NOT NULL,
  image_url    TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMP DEFAULT NOW(),
  updated_at   TIMESTAMP DEFAULT NOW()
);
```

---

## Manual Setup (Without Docker)

**1. Install dependencies**

```bash
npm install
```

**2. Start PostgreSQL locally**

Ensure `DATABASE_URL` in `.env` points to a running PostgreSQL instance.

**3. Run migrations**

```bash
npx drizzle-kit generate   # generate migration files
npx drizzle-kit push       # apply schema to database
```

**4. Run the app**

```bash
npm run dev
```

---

##  First User Setup

After the initial deployment, manually promote the first user to Headmaster: to allow him to give access to others

```sql
UPDATE users
SET role = 'Headmaster',
    is_verified = true
WHERE email = 'your-email@example.com';
```


---

##  Cloudinary Setup

Cloudinary is required for image uploads (gallery and backgrounds).

1. have the cloudinary file
2. Copy your **Cloud Name**, **API Key**, and **API Secret**
3. Add them to your `.env` file

> If Cloudinary is not configured, image uploads will fail and the gallery will not function.

**Using a different image host?**
Replace the upload logic in `app/api/gallery/route.ts` with your provider's SDK. The relevant section is the `upload_stream` block that sends the file buffer to Cloudinary.

---

##  Database Tables

| Table | Description |
|---|---|
| `users` | User accounts, roles, verification status |
| `announcements` | School-wide announcements |
| `gallery` | Gallery images with Cloudinary URLs |
| `testimonials` | User-submitted testimonials |

---

## Deployment Checklist

- [ ] `.env` file created with all required variables
- [ ] Database migrated (Drizzle or manual SQL)
- [ ] Cloudinary credentials configured
- [ ] First Headmaster account promoted via SQL or manually
- [ ] Docker running — or manual setup verified

if something went wrong you can reach us on gilbertnshimyimana11@gmail.com