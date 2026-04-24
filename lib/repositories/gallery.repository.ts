import { db } from "@/lib/db";
import { gallery } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const GalleryRepository = {
  create: (data: any) =>
    db.insert(gallery).values(data).returning(),

  findAll: () =>
    db.select().from(gallery),

  findById: (id: string) =>
    db.select().from(gallery).where(eq(gallery.id, id)),

  update: (id: string, data: any) =>
    db
      .update(gallery)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(gallery.id, id))
      .returning(),

  delete: (id: string) =>
  db
    .delete(gallery)
    .where(eq(gallery.id, id))
    .returning(),
};