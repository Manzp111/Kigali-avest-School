import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/lib/validators/auth/register.validator";
import { authService } from "@/lib/services/auth.service";

export async function POST(req: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  console.log(`[START SIGNUP ${requestId}]: Processing new request...`);

  try {
    const body = await req.json();

    // 1. Zod Validation
    console.log(`[TRACE ${requestId}]: Validating input schema...`);
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      const firstErrorMessage = result.error.issues[0]?.message || "Validation failed";
      console.warn(`[VALIDATION FAIL ${requestId}]:`, result.error.flatten());
      
      return NextResponse.json(
        {
          success: false,
          message: firstErrorMessage,
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    // 2. Auth Service Call
    console.log(`[TRACE ${requestId}]: Calling authService.signup for email: ${result.data.email}`);
    const user = await authService.signup(result.data);

    console.log(`[SUCCESS ${requestId}]: User created with ID: ${user.id}`);
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
    // CRITICAL: Log the full error with cause (SSL, Connection, etc.)
    console.error(`[FATAL SIGNUP ERROR ${requestId}]:`, error);

    const statusMap: Record<string, number> = {
      ConflictError: 409,
      UnauthorizedError: 401,
      ValidationError: 400,
    };

    const status = statusMap[error.name] || 500;

    // Return full error details to frontend for debugging
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
        debug: {
          requestId,
          errorName: error.name,
          stack: error.stack?.split('\n')[0],
          cause: error.cause || null,
          envCheck: {
            hasDbUrl: !!process.env.DATABASE_URL,
            nodeEnv: process.env.NODE_ENV
          },
          hint: error.message?.includes("self-signed") 
            ? "Add ?sslmode=no-verify to your DATABASE_URL" 
            : "Check your database connection or table existence."
        }
      },
      { status }
    );
  }
}