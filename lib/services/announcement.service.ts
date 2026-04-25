import { announcementRepository } from "@/lib/repositories/announcement.repository";

export const announcementService = {
  async create(data: any) {
    const cleanedData = {
      ...data,
      publishAt: data.publishAt ? new Date(data.publishAt) : null,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    };

    return await announcementRepository.create(cleanedData);
  },

async getAll(filters: any) {
  return await announcementRepository.findAll(filters);
},

  async getById(id: string) {
    return await announcementRepository.findById(id);
  },

  async update(id: string, data: any) {
    const cleanedData = {
      ...data,
      publishAt: data.publishAt ? new Date(data.publishAt) : undefined,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      updatedAt: new Date(),
    };

    return await announcementRepository.update(id, cleanedData);
  },

  async remove(id: string) {
    return await announcementRepository.delete(id);
  },
};