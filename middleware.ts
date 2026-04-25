import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  // console.log(" [MIDDLEWARE] Running:", req.nextUrl.pathname);

  const authHeader = req.headers.get("authorization");
  // console.log("🔐 Auth header:", authHeader);

  if (!authHeader) {
    return NextResponse.json(
      { success: false, message: "No token provided" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Invalid token format" },
      { status: 401 }
    );
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_ACCESS_SECRET!
    );

    const { payload } = await jwtVerify(token, secret);

    // console.log("👤 VERIFIED USER:", payload);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user", JSON.stringify(payload));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    // console.log(" TOKEN ERROR:", err);

    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/auth/user/:path*",
    "/api/announcement/:path*",
    "/api/gallery/:path*",
    // "/api/admin/:path*",
  ],
};