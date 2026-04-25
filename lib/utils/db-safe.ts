import { NextRequest, NextResponse } from "next/server";

type Handler = (
  req: NextRequest,
  context?: any
) => Promise<Response>;

export function withErrorHandler(handler: Handler) {
  return async (req: NextRequest, context?: any) => {
    try {
      return await handler(req, context);
    } catch (err: unknown) {
      let message = "Internal Server Error";

      // Safe error parsing
      if (err instanceof Error) {
        // 🔍 Detect DB-related errors
        const isDbError =
          err.message.includes("Failed query") ||
          err.message.includes("fetch failed");

        message = isDbError
          ? "Database connection failed"
          : "Internal Server Error";

        // 👇 Only log message in development
        if (process.env.NODE_ENV === "development") {
          console.error("API Error:", err.message);
        }
      }

      return NextResponse.json(
        {
          success: false,
          message,
        },
        { status: 500 }
      );
    }
  };
}