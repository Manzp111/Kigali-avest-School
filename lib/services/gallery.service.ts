import { GalleryRepository } from "@/lib/repositories/gallery.repository";

export const GalleryService = {
  create: (data: any) => GalleryRepository.create(data),

  getAll: () => GalleryRepository.findAll(),

  getById: (id: string) => GalleryRepository.findById(id),

  update: (id: string, data: any) =>
    GalleryRepository.update(id, data),

  remove: (id: string) => GalleryRepository.delete(id),
};