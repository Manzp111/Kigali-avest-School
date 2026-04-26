import { db } from "@/lib/db";
import { announcements } from "@/lib/db/schema";
import { eq, sql, and, asc, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export type AnnouncementFilters = {
  page: number;
  limit: number;
  isPublished?: boolean;
  userId?: string;
  search?: string;
  sortBy?: "createdAt" | "updatedAt";
  order?: "asc" | "desc";
};

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

  async findAll(filters: AnnouncementFilters) {
    const {
      page,
      limit,
      isPublished,
      userId,
      search,
      sortBy = "createdAt",
      order = "desc",
    } = filters;

    const offset = (page - 1) * limit;

    const conditions = [];

    if (isPublished !== undefined) {
      conditions.push(eq(announcements.isPublished, isPublished));
    }

    if (userId) {
      conditions.push(eq(announcements.userId, userId));
    }

    const baseQuery = db
      .select()
      .from(announcements)
      .where(conditions.length ? and(...conditions) : undefined);

    const sortedQuery =
      order === "asc"
        ? baseQuery.orderBy(asc(announcements[sortBy]))
        : baseQuery.orderBy(desc(announcements[sortBy]));

    const data = await sortedQuery.limit(limit).offset(offset);

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(announcements)
      .where(conditions.length ? and(...conditions) : undefined);

    const total = Number(totalResult[0].count ?? 0);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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