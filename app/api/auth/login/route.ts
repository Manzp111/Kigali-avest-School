import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/lib/validators/auth/login.validator";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: Request) {
  console.log("🚀 LOGIN START");

  try {
    const body = await req.json();

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      console.log("❌ VALIDATION ERROR:", result.error.flatten());

      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      );
    }

    console.log("✅ VALIDATION OK");

    const user = await authService.login(result.data);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!accessSecret || !refreshSecret) {
      console.log("❌ JWT secrets missing");

      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    console.log("🔐 Creating tokens...");

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      accessSecret,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      refreshSecret,
      { expiresIn: "7d" }
    );

    console.log("🟢 TOKENS CREATED");

    const response = NextResponse.json({
      success: true,
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // FIXED (7 days)
    });

    console.log("🍪 REFRESH TOKEN SET");

    return response;
  } catch (error: any) {
    console.error("💥 LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}