import { NextRequest, NextResponse } from "next/server";

// Standardizing error names to avoid import loops
export function withErrorHandler(handler: any) {
  return async (req: NextRequest, context?: any) => {
    try {
      return await handler(req, context);
    } catch (err: any) {
      // 1. Log the full error for Vercel Runtime Logs
      console.error("[API ERROR]:", err);

      // 2. Identify the error type
      const isUnauthorized = 
        err.name === "UnauthorizedError" || 
        err.status === 401 || 
        err.message?.toLowerCase().includes("unauthorized") ||
        err.message?.toLowerCase().includes("invalid credentials");

      const isConflict = err.name === "ConflictError" || err.status === 409;

      // 3. Identify Database/Connection issues (Common on Vercel)
      const isConnError = 
        err.message?.includes("ECONNREFUSED") || 
        err.message?.includes("localhost") ||
        err.message?.includes("fetch failed");

      // 4. Construct the response
      let statusCode = 500;
      if (isUnauthorized) statusCode = 401;
      else if (isConflict) statusCode = 409;

      let responseMessage = err.message || "Internal Server Error";
      
      // Add a helpful hint if it's a database connection issue
      if (isConnError) {
        responseMessage = "Database connection failed. Check your DATABASE_URL env.";
      }

      return NextResponse.json(
        {
          success: false,
          message: responseMessage,
          // Only show stack trace in development
          stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        },
        { status: statusCode }
      );
    }
  };
}