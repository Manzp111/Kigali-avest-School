import { z } from "zod";

export const createGallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().url("Invalid image URL"),
  subtitle: z.string().optional().nullable(), // DB allows null, so Zod should too
  type: z.enum(["background", "gallery"]).optional(),
  published: z.boolean().optional(),
});

export const updateGallerySchema = createGallerySchema.partial();