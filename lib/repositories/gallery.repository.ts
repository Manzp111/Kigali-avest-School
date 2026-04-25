import { db } from "@/lib/db";
import { gallery } from "@/lib/db/schema";
import { desc, and, eq, sql } from "drizzle-orm";
import {
  CreateGalleryInput,
  UpdateGalleryInput,
} from "@/lib/types/gallery.types";

type GalleryFilters = {
  type?: "gallery" | "background";
  published?: boolean;
  limit?: number;
  offset?: number;
};

export const GalleryRepository = {
  async create(data: CreateGalleryInput) {
    const [result] = await db.insert(gallery).values(data).returning();
    return result;
  },

  async findAll({
    type,
    published,
    limit = 10,
    offset = 0,
  }: GalleryFilters) {
    const conditions = [];

    if (type) {
      conditions.push(eq(gallery.type, type));
    }

    if (published !== undefined) {
      conditions.push(eq(gallery.published, published));
    }

    return db
      .select()
      .from(gallery)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(gallery.updatedAt))
      .limit(limit)
      .offset(offset);
  },

  async count({ type, published }: GalleryFilters) {
    const conditions = [];

    if (type) {
      conditions.push(eq(gallery.type, type));
    }

    if (published !== undefined) {
      conditions.push(eq(gallery.published, published));
    }

    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(gallery)
      .where(conditions.length ? and(...conditions) : undefined);

    return result[0]?.count || 0;
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
    if (Object.keys(data).length === 0) {
      return this.findById(id);
    }

    const [result] = await db
      .update(gallery)
      .set({
        ...data,
        updatedAt: new Date(),
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