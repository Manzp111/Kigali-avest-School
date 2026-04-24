import { z } from "zod";
export const createGallerySchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  priority: z.number().optional(),
});

export const updateGallerySchema = createGallerySchema.partial();

// export const updateGallerySchema = z.object({
//   title: z.string().min(1).optional(),
//   subtitle: z.string().optional(),
//   buttonText: z.string().optional(),
//   buttonLink: z.string().url().optional(),
//   published: z.boolean().optional(),
//   priority: z.number().optional(),
// });