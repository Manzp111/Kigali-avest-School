import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

import { randomUUID } from "crypto";
import { pgEnum } from "drizzle-orm/pg-core";


  //  USERS

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),

  email: text("email").notNull().unique(),
  phone: text("phone").notNull().unique(),
  password: text("password").notNull(),

  role: text("role").notNull().default("teacher"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


  //  ANNOUNCEMENTS

export const announcements = pgTable("announcements", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),

  title: text("title").notNull(),
  message: text("message").notNull(),

  imageUrl: text("image_url"),
  fileUrl: text("file_url"),

  isPublished: boolean("is_published").default(false),

  publishAt: timestamp("publish_at"),
  expiresAt: timestamp("expires_at"),

  priority: integer("priority").default(0),

  userId: text("user_id"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


  //  GALLERY

export const imageTypeEnum = pgEnum("image_type", [
  "background",
  "gallery",
]);

export const gallery = pgTable("gallery", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),

  title: text("title").notNull(),
  subtitle: text("subtitle"),

  imageUrl: text("image_url").notNull(),

  type: imageTypeEnum("type").default("gallery"),

  published: boolean("published").default(false),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});


  //  TESTIMONIALS

export const testimonials = pgTable("testimonials", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),

  name: text("name").notNull(),
  message: text("message").notNull(),
  role: text("role"),

  imageUrl: text("image_url"),

  isPublished: boolean("is_published").default(false),
  priority: integer("priority").default(0),

  createdAt: timestamp("created_at").defaultNow(),
});