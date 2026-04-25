import { GalleryRepository } from "@/lib/repositories/gallery.repository";
import {
  CreateGalleryInput,
  UpdateGalleryInput,
} from "@/lib/types/gallery.types";

type GetGalleryFilters = {
  type?: "gallery" | "background";
  published?: boolean;
  page?: number;
  limit?: number;
};

export const GalleryService = {
  // Create
  async create(data: CreateGalleryInput) {
    return GalleryRepository.create(data);
  },

  // Get All (with pagination)
  async getAll({
    type,
    published,
    page = 1,
    limit = 10,
  }: GetGalleryFilters) {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const offset = (safePage - 1) * safeLimit;

    const data = await GalleryRepository.findAll({
      type,
      published,
      limit: safeLimit,
      offset,
    });

    const total = await GalleryRepository.count({
      type,
      published,
    });

    return {
      data,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  },

  // Get by ID
  async getById(id: string) {
    return GalleryRepository.findById(id);
  },

  // Update
  async update(id: string, data: UpdateGalleryInput) {
    const result = await GalleryRepository.update(id, data);

    if (!result) {
      throw new Error("Gallery not found");
    }

    return result;
  },

  // Delete
  async remove(id: string) {
    const result = await GalleryRepository.delete(id);

    if (!result) {
      throw new Error("Gallery not found");
    }

    return result;
  },
};