import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export type AuthPayload = {
  userId: string;
  role?: string;
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

    return {
      success: true,
      payload: payload as AuthPayload,
    };
  } catch (error) {
    return {
      success: false,
      response: NextResponse.json(
        { message: "Unauthorized - Invalid token" },
        { status: 401 }
      ),
    };
  }
}