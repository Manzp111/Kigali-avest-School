// @/types/announcement.ts
export type Announcement = {
  id: string;
  title: string;
  message: string;
  imageUrl?: string | null; 
  isPublished: boolean;
  userId?: string | null;
  createdAt: string;
  updatedAt?: string | null;
};