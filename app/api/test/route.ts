// app/api/test-users/route.ts

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(users);
    return Response.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}