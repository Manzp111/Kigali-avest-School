import { db } from "@/lib/db";
import { announcements } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export const announcementRepository = {
  async create(data: any) {
    const result = await db
      .insert(announcements)
      .values({
        id: randomUUID(),
        ...data,
      })
      .returning();

    return result[0];
  },

  async findAll() {
    return await db.select().from(announcements);
  },

  async findById(id: string) {
    const result = await db
      .select()
      .from(announcements)
      .where(eq(announcements.id, id));

    return result[0];
  },

  async update(id: string, data: any) {
    const result = await db
      .update(announcements)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(announcements.id, id))
      .returning();

    return result[0];
  },

  async delete(id: string) {
    return await db
      .delete(announcements)
      .where(eq(announcements.id, id))
      .returning();
  },
};