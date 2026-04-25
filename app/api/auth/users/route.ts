import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/lib/services/user.service";
import type { UserRole } from "@/lib/repositories/user.repository";
import { verifyAuth } from "@/lib/utils/tokenVerify";

export async function GET(req: NextRequest) {
  try {
    // 🔐 AUTH CHECK (ONLY ONE LINE YOU NEED)
    const auth = await verifyAuth(req);

    if (!auth.success) {
      return auth.response;
    }

    const { searchParams } = new URL(req.url);

    // 📄 pagination
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    // 🔎 filters
    const email = searchParams.get("email");
    const role = searchParams.get("role") as UserRole | null;

    // 👤 trusted user (from token)
    const user = auth.payload;

    // 🔐 OPTIONAL ROLE PROTECTION
    // if (user.role !== "admin") {
    //   return NextResponse.json(
    //     { success: false, message: "Forbidden" },
    //     { status: 403 }
    //   );
    // }

    const result = await userService.getUsers({
      page,
      limit,
      email,
      role,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}