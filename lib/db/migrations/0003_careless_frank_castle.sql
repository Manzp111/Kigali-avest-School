CREATE TYPE "public"."image_type" AS ENUM('background', 'gallery');--> statement-breakpoint
ALTER TABLE "gallery" ADD COLUMN "type" "image_type" DEFAULT 'gallery';--> statement-breakpoint
ALTER TABLE "gallery" DROP COLUMN "button_text";--> statement-breakpoint
ALTER TABLE "gallery" DROP COLUMN "button_link";--> statement-breakpoint
ALTER TABLE "gallery" DROP COLUMN "priority";