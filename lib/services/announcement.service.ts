import { announcementRepository } from "@/lib/repositories/announcement.repository";

export const announcementService = {
  async create(data: any) {
    return await announcementRepository.create(data);
  },

  async getAll() {
    return await announcementRepository.findAll();
  },

  async getById(id: string) {
    return await announcementRepository.findById(id);
  },

  async update(id: string, data: any) {
    return await announcementRepository.update(id, data);
  },

  async remove(id: string) {
    return await announcementRepository.delete(id);
  },
};