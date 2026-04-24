import { db } from "@/lib/db";
import { gallery } from "@/lib/db/schema";
import { desc, and, eq } from "drizzle-orm";
import {
  CreateGalleryInput,
  UpdateGalleryInput,
} from "@/lib/types/gallery.types";


export const GalleryRepository = {
  async create(data: CreateGalleryInput) {
    // Drizzle returning() returns an array [insertedItem]
    const [result] = await db.insert(gallery).values(data).returning();
    return result;
  },

async findAll(filters?: { published?: boolean; type?: "background" | "gallery" }) {
  const conditions = [];

  if (filters?.published !== undefined) {
    conditions.push(eq(gallery.published, filters.published));
  }
  if (filters?.type) {
    conditions.push(eq(gallery.type, filters.type));
  }

  return await db
    .select()
    .from(gallery)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(gallery.updatedAt)); // 👈 Newest comes first
},

  async findById(id: string) {
    const [result] = await db
      .select()
      .from(gallery)
      .where(eq(gallery.id, id))
      .limit(1);
    return result ?? null;
  },

  async update(id: string, data: UpdateGalleryInput) {
    // Check if data is empty to avoid unnecessary DB calls
    if (Object.keys(data).length === 0) {
        return this.findById(id);
    }

    const [result] = await db
      .update(gallery)
      .set({
        ...data,
        updatedAt: new Date(), // Manually updating the timestamp
      })
      .where(eq(gallery.id, id))
      .returning();
    
    return result ?? null;
  },

  async delete(id: string) {
    const [result] = await db
      .delete(gallery)
      .where(eq(gallery.id, id))
      .returning();
    return result ?? null;
  },
};