// gallery.types.ts
import { z } from "zod";
import { createGallerySchema, updateGallerySchema } from "@/lib/validators/gallery/gallery.validation";

export type CreateGalleryInput = z.infer<typeof createGallerySchema>;
export type UpdateGalleryInput = z.infer<typeof updateGallerySchema>;