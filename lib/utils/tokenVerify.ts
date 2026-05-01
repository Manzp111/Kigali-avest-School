import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export type AuthPayload = {
  userId: string;
  role: string;
};

export async function verifyAuth(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return {
        success: false,
        response: NextResponse.json(
          { message: "Unauthorized - No token" },
          { status: 401 }
        ),
      };
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return {
        success: false,
        response: NextResponse.json(
          { message: "Unauthorized - Invalid token format" },
          { status: 401 }
        ),
      };
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_ACCESS_SECRET!
    );

    const { payload } = await jwtVerify(token, secret);

    // 🔐 ALWAYS GET FRESH USER FROM DATABASE (IMPORTANT FIX)
    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.userId as string),
    });

    if (!user) {
      return {
        success: false,
        response: NextResponse.json(
          { message: "User not found" },
          { status: 401 }
        ),
      };
    }

    // 🔥 NEVER TRUST TOKEN ROLE — ALWAYS USE DB ROLE
    return {
      success: true,
      payload: {
        userId: user.id,
        role: user.role,
      },
    };
  } catch (error) {
    return {
      success: false,
      response: NextResponse.json(
        { message: "Unauthorized - Invalid or expired token" },
        { status: 401 }
      ),
    };
  }
}