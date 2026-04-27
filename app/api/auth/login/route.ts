import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/lib/validators/auth/login.validator";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      );
    }

    // 1. Attempt login via service
    // If this fails, it's likely a DB connection or missing "users" table
    const user = await authService.login(result.data);

    // 2. Retrieve Secrets
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    // 3. Check if secrets exist before signing (JWT will crash if undefined)
    if (!accessSecret || !refreshSecret) {
      throw new Error(`MISSING_SECRETS: Access=${!!accessSecret}, Refresh=${!!refreshSecret}`);
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      accessSecret,
      { expiresIn: "1d" }
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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });

    // 4. Set Cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;

  } catch (error: any) {
    // LOG TO VERCEL (Visible in Logs tab)
    console.error("[CRITICAL LOGIN ERROR]:", error);

    // RETURN FULL ERROR TO FRONTEND FOR DEBUGGING
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
        debug: {
          errorName: error.name,
          stack: error.stack?.split('\n')[0], // First line of the stack trace
          envCheck: {
            hasDbUrl: !!process.env.DATABASE_URL,
            hasAccessSecret: !!process.env.JWT_ACCESS_SECRET,
            hasRefreshSecret: !!process.env.JWT_REFRESH_SECRET,
          },
          // Helpful hint for common Vercel errors
          hint: error.message?.includes("relation") 
            ? "Your 'users' table is likely missing in Supabase." 
            : "Check your Vercel Environment Variables."
        }
      },
      { status: error.status || 500 }
    );
  }
}