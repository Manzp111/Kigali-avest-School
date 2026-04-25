import { z } from "zod";

export const createGallerySchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  imageUrl: z.string().url("A valid secure image URL is required"),
  subtitle: z.string().optional().nullable(),
  publicId: z.string().min(1, "Cloudinary Public ID is missing"),
  type: z.enum(["background", "gallery"]).default("gallery"),
  published: z.boolean().optional().default(false),
});

export const updateGallerySchema = createGallerySchema.partial();