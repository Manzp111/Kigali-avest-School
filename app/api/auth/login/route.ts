import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/lib/validators/auth/login.validator";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: Request) {
 

  try {
    // 1. Parse body
    const body = await req.json();
  

    // 2. Validate
    const result = loginSchema.safeParse(body);

    if (!result.success) {

      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      );
    }


    // 3. Auth service (Drizzle or DB logic inside here)
   
    const user = await authService.login(result.data);

  
    if (!user) {
      throw new Error("User not found or invalid credentials");
    }

    // 4. Check env safely
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!accessSecret || !refreshSecret) {
      throw new Error("JWT secrets missing in .env");
    }

   

    // 5. Access token
    const accessToken = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      accessSecret,
      { expiresIn: "15m" }
    );

    // 6. Refresh token
    const refreshToken = jwt.sign(
      {
        userId: user.id,
      },
      refreshSecret,
      { expiresIn: "7d" }
    );

   

    // 7. Response
    const response = NextResponse.json({
      success: true,
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

    // 8. Cookie (refresh token)
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    

    return response;
  } catch (error: any) {
    // console.error("💥 [LOGIN ERROR]:", error.message);
    // console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      { status: 400 }
    );
  }
}