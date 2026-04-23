import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/validators/auth/register.validator";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: Request) {
  try {
    // console.log("🚀 Signup API hit");

    const body = await req.json();

    // validation
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      );
    }

    // service
    const user = await authService.signup(result.data);

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error: any) {

    // 🔴 HANDLE BUSINESS ERROR PROPERLY
    if (error.message === "User already exists") {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 } // conflict
      );
    }

    // only real server errors go here
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}