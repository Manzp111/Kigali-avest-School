import { announcementRepository, AnnouncementFilters } from "@/lib/repositories/announcement.repository";




export const announcementService = {
  async create(data: any) {
    return announcementRepository.create({
      ...data,
      publishAt: data.publishAt ? new Date(data.publishAt) : null,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    });
  },

  async getAll(filters: AnnouncementFilters) {
    return announcementRepository.findAll(filters);
  },

  async getById(id: string) {
    return announcementRepository.findById(id);
  },

  async update(id: string, data: any) {
    return announcementRepository.update(id, {
      ...data,
      publishAt: data.publishAt ? new Date(data.publishAt) : undefined,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
    });
  },

  async remove(id: string) {
    return announcementRepository.delete(id);
  },
};