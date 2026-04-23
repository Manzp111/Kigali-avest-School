import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";

export const userRepository = {
  // find user by email for login
  async findByEmail(email: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return result[0];
},
  // find user by email or phone for signup validation
  async findByEmailOrPhone(email: string, phone: string) {
    return db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.phone, phone)))
      .limit(1);
  },

  async createUser(data: {
    email: string;
    phone: string;
    password: string;
  }) {
    const result = await db
      .insert(users)
      .values({
        ...data,
        role: "teacher",
      })
      .returning();

    return result[0];
  },

  async countUsers() {
    return db.select().from(users);
  },
  async getAllUsers() {
    return db.select().from(users);
  },
};