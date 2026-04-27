import { NextRequest, NextResponse } from "next/server";

export function withErrorHandler(handler: any) {
  return async (req: NextRequest, context?: any) => {
    const requestId = Math.random().toString(36).substring(7); // Unique ID to track this specific request
    // console.log(`[START REQUEST ${requestId}]: ${req.method} ${req.url}`);

    try {
      // Trace: Before executing the actual route logic
      // console.log(`[TRACE ${requestId}]: Entering handler logic...`);
      
      const response = await handler(req, context);
      
      // Trace: Success
      // console.log(`[TRACE ${requestId}]: Handler executed successfully with status ${response.status}`);
      return response;

    } catch (err: any) {
           

      // 2. Identify the error type
      const isUnauthorized = 
        err.name === "UnauthorizedError" || 
        err.status === 401 || 
        err.message?.toLowerCase().includes("unauthorized") ||
        err.message?.toLowerCase().includes("invalid credentials");

      const isConflict = err.name === "ConflictError" || err.status === 409;

      // 3. Database/Connection Check
      const isConnError = 
        err.message?.includes("ECONNREFUSED") || 
        err.message?.includes("localhost") ||
        err.message?.includes("fetch failed") ||
        err.message?.includes("timeout");

      let statusCode = 500;
      if (isUnauthorized) statusCode = 401;
      else if (isConflict) statusCode = 409;

      let responseMessage = err.message || "Internal Server Error";
      
      if (isConnError) {
        // console.warn(`[DIAGNOSTIC ${requestId}]: Potential DB Connection issue detected.`);
        responseMessage = "Database connection failed. Verify DATABASE_URL in Vercel Settings.";
      }

      return NextResponse.json(
        {
          success: false,
          message: responseMessage,
          requestId, // Return ID so you can find this exact error in Vercel logs
          stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        },
        { status: statusCode }
      );
    }
  };
}