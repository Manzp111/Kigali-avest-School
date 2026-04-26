import { z } from "zod";



export const createAnnouncementSchema = z.object({
  title: z.string().min(6, "Title is too short"),
  message: z.string().min(15, "Message is too short"),
  imageUrl: z.string().url().optional().nullable().or(z.literal("")),
  isPublished: z.boolean().optional().default(false),
  userId: z.string(),
});

export const updateAnnouncementSchema = createAnnouncementSchema.partial().omit({ userId: true });