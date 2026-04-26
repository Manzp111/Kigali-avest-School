CREATE TYPE "public"."image_type" AS ENUM('background', 'gallery');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('Headmaster', 'teacher');--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"image_url" text,
	"is_published" boolean DEFAULT false,
	"user_id" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "gallery" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"image_url" text NOT NULL,
	"public_id" text NOT NULL,
	"type" "image_type" DEFAULT 'gallery',
	"published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"message" text NOT NULL,
	"image_url" text,
	"is_published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'teacher',
	"is_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "announcements_user_idx" ON "announcements" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "gallery_type_idx" ON "gallery" USING btree ("type");--> statement-breakpoint
CREATE INDEX "users_email_idx" ON "users" USING btree ("email");