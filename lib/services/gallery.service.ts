// gallery.service.ts
import { GalleryRepository } from "@/lib/repositories/gallery.repository";
import {
  CreateGalleryInput,
  UpdateGalleryInput,
} from "@/lib/types/gallery.types";

export const GalleryService = {
  // ✅ Create: Returns the single created object
  async create(data: CreateGalleryInput) {
    return await GalleryRepository.create(data);
  },

  // ✅ Get All: Now correctly accepts and passes filters
  async getAll(filters?: { type?: "background" | "gallery"; published?: boolean }) {
    return await GalleryRepository.findAll(filters);
  },

  // ✅ Get By ID: Returns the object or null
  async getById(id: string) {
    const result = await GalleryRepository.findById(id);
    return result;
  },

  // ✅ Update: Handles the "not found" case for single objects
  async update(id: string, data: UpdateGalleryInput) {
    const result = await GalleryRepository.update(id, data);

    if (!result) {
      throw new Error("Gallery not found");
    }

    return result;
  },

  // ✅ Remove: Handles the "not found" case for single objects
  async remove(id: string) {
    const result = await GalleryRepository.delete(id);

    if (!result) {
      throw new Error("Gallery not found");
    }

    return result;
  },
};