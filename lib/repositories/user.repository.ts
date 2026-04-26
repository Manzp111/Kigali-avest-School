import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import {
  eq,
  or,
  like,
  and,
  sql,
  SQL,
  desc,
} from "drizzle-orm";

export type UserRole = typeof users.$inferSelect.role;

const allowedRoles: UserRole[] = ["Headmaster", "teacher"];

export const userRepository = {
  //
  // 🔍 FIND BY EMAIL
  //
  async findByEmail(email: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0];
  },

  //
  // 🔍 FIND BY EMAIL OR PHONE
  //
  async findByEmailOrPhone(email: string, phone: string) {
    const result = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.phone, phone)))
      .limit(1);

    return result[0];
  },

  //
  // ➕ CREATE USER
  //
  async createUser(data: {
    email: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const result = await db
      .insert(users)
      .values({
        email: data.email,
        phone: data.phone,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: "teacher",
      })
      .returning();

    return result[0];
  },

  //
  // 🔢 COUNT USERS
  //
  async countUsers() {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);

    return Number(result[0].count ?? 0);
  },

  //
  // 📄 GET ALL USERS
  //
  async getAllUsers() {
    return db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        phone: users.phone,
        role: users.role,
        isVerified: users.isVerified,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users);
  },

  //
  // 🔎 GET USERS WITH FILTERS + PAGINATION (FIXED)
  //
async getUsersWithFilters({
  page,
  limit,
  email,
  role,
}: {
  page: number;
  limit: number;
  email?: string | null;
  role?: UserRole | null;
}) {
  // ✅ SAFE PAGINATION
  const safePage =
    Number.isFinite(page) && page > 0 ? page : 1;

  const safeLimit =
    Number.isFinite(limit) && limit > 0 ? limit : 10;

  const offset = (safePage - 1) * safeLimit;

  // ✅ ROLE VALIDATION
  if (role && !allowedRoles.includes(role)) {
    throw new Error("Invalid role value");
  }

  // ✅ FILTERS
  const filters: SQL[] = [];

  if (email) {
    filters.push(like(users.email, `%${email}%`));
  }

  if (role) {
    filters.push(eq(users.role, role));
  }

  const whereClause = filters.length
    ? and(...filters)
    : undefined;

  // ✅ BASE SELECT (NO DUPLICATION)
  const baseSelect = db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phone: users.phone,
      role: users.role,
      isVerified: users.isVerified,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users);

  // ✅ APPLY WHERE SAFELY
  const finalQuery = whereClause
    ? baseSelect.where(whereClause)
    : baseSelect;

  // 📦 DATA QUERY
  const data = await finalQuery
    .orderBy(desc(users.createdAt))
    .limit(safeLimit)
    .offset(offset);

  // =========================
  // 🔢 COUNT QUERY (FIXED)
  // =========================
  const baseCount = db
    .select({ count: sql<number>`count(*)` })
    .from(users);

  const finalCountQuery = whereClause
    ? baseCount.where(whereClause)
    : baseCount;

  const totalResult = await finalCountQuery;

  const total = Number(totalResult[0].count ?? 0);

  // 📦 RESPONSE
  return {
    data,
    meta: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
},
async findById(id: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return result[0];
},
async updateUser(
  id: string,
  data: Partial<{
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    isVerified: boolean;
  }>
) {
  //  prevent invalid role
  if (data.role && !allowedRoles.includes(data.role)) {
    throw new Error("Invalid role value");
  }

  const result = await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning();

  return result[0];
},
async deleteUser(id: string) {
  const result = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();

  return result[0];
},
};