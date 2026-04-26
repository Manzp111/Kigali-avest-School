import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const globalForDb = globalThis as unknown as {
  sql?: ReturnType<typeof neon>;
};

export const sql =
  globalForDb.sql ??
  neon(process.env.DATABASE_URL!);

if (process.env.NODE_ENV !== "production") {
  globalForDb.sql = sql;
}

export const db = drizzle(sql);