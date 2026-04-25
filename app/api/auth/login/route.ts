import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/lib/validators/auth/login.validator";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      );
    }

    // Wrap service call in try/catch to identify specific auth errors
    const user = await authService.login(result.data);

    const accessSecret = process.env.JWT_ACCESS_SECRET!;
    const refreshSecret = process.env.JWT_REFRESH_SECRET!;

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
      maxAge: 7 * 24 * 60 * 60, 
    });

    return response;
  } catch (error: any) {
    // Check if it's an error we threw intentionally
    const isAuthError = error.name === "UnauthorizedError" || error.status === 401;
    
    return NextResponse.json(
      { 
        success: false, 
        message: isAuthError ? error.message : "Internal server error" 
      },
      { status: isAuthError ? 401 : 500 }
    );
  }
}