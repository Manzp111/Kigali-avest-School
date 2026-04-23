import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().min(3, "Title is required"),
  message: z.string().min(5, "Message is required"),

  imageUrl: z.string().url().optional().nullable(),
  fileUrl: z.string().url().optional().nullable(),

  isPublished: z.boolean().optional(),

  publishAt: z.string().optional().nullable(),
  expiresAt: z.string().optional().nullable(),

  priority: z.number().int().optional(),

  userId: z.string(),
});

export const updateAnnouncementSchema = z.object({
  title: z.string().min(3).optional(),
  message: z.string().min(5).optional(),

  imageUrl: z.string().url().optional().nullable(),
  fileUrl: z.string().url().optional().nullable(),

  isPublished: z.boolean().optional(),

  publishAt: z.string().optional().nullable(),
  expiresAt: z.string().optional().nullable(),

  priority: z.number().int().optional(),
});