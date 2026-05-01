import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/validators/auth/register.validator";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);

  try {
    const body = await req.json();

    //  Zod Validation
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      const firstErrorMessage = result.error.issues[0]?.message || "Validation failed";
      
      return NextResponse.json(
        {
          success: false,
          message: firstErrorMessage,
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    //  Auth Service Call
    const user = await authService.signup(result.data);

    return NextResponse.json({
      success: true,
      message: "User created successfully 🎉",
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
    }, { status: 201 });

  } catch (error: any) {
    
    const statusMap: Record<string, number> = {
      ConflictError: 409,
      UnauthorizedError: 401,
      ValidationError: 400,
    };

    const status = statusMap[error.name] || 500;

    // Return  error details 
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
        
      },
      { status }
    );
  }
}