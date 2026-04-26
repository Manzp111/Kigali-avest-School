import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";


// 🔐 ENUMS


export const userRoleEnum = pgEnum("user_role", [
  "Headmaster",
  "teacher",
]);

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey().$defaultFn(() => randomUUID()),

    firstName: text("first_name"),
    lastName: text("last_name"),

    email: text("email").notNull().unique(),
    phone: text("phone").notNull().unique(),
    password: text("password").notNull(),

    role: userRoleEnum("role").default("teacher"),
    isVerified: boolean("is_verified").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
  })
);


// 📢 ANNOUNCEMENTS


export const announcements = pgTable(
  "announcements",
  {
    id: text("id").primaryKey().$defaultFn(() => randomUUID()),

    title: text("title").notNull(),
    message: text("message").notNull(),

    imageUrl: text("image_url"),

    isPublished: boolean("is_published").default(false),
    
    userId: text("user_id").references(() => users.id, {
      onDelete: "set null",
    }),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    userIdx: index("announcements_user_idx").on(table.userId),
  })
);


// 🖼️ GALLERY


export const imageTypeEnum = pgEnum("image_type", [
  "background",
  "gallery",
]);

export const gallery = pgTable(
  "gallery",
  {
    id: text("id").primaryKey().$defaultFn(() => randomUUID()),

    title: text("title").notNull(),
    subtitle: text("subtitle"),

    imageUrl: text("image_url").notNull(),
    publicId: text("public_id").notNull(), // required for Cloudinary

    type: imageTypeEnum("type").default("gallery"),

    published: boolean("published").default(false),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    typeIdx: index("gallery_type_idx").on(table.type),
  })
);

//
// ⭐ TESTIMONIALS (FINAL SIMPLIFIED VERSION)
//

export const testimonials = pgTable("testimonials", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),

  // visitor info
  name: text("name").notNull(),
  email: text("email"),

  message: text("message").notNull(),

  imageUrl: text("image_url"),

  // moderation
  isPublished: boolean("is_published").default(false),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});