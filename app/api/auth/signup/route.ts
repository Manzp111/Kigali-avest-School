import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/validators/auth/register.validator";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Run Zod Validation (Includes your custom superRefine logic)
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      // Extract the most relevant error message to show the user
      const firstErrorMessage = result.error.issues[0]?.message || "Validation failed";

      return NextResponse.json(
        {
          success: false,
          message: firstErrorMessage, // Sends specific "Double Check" fail message
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    // 2. Proceed to Auth Service
    const user = await authService.signup(result.data);

    return NextResponse.json({
      success: true,
      message: "User created successfully 🎉",
      user,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Signup error:", error);

    // 3. Handle specific domain errors (Conflict/Unauthorized)
    const statusMap: Record<string, number> = {
      ConflictError: 409,
      UnauthorizedError: 401,
      ValidationError: 400,
    };

    const status = statusMap[error.name] || 500;
    const message = status === 500 ? "Internal server error" : error.message;

    return NextResponse.json(
      {
        success: false,
        message: message,
      },
      { status }
    );
  }
}