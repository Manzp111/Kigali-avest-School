import { NextResponse } from "next/server";
import { userService } from "@/lib/services/user.service";
import type { UserRole } from "@/lib/repositories/user.repository";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // 📄 pagination
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    // 🔎 filters
    const email = searchParams.get("email");

    const role = searchParams.get("role") as UserRole | null;

    // 👤 optional auth (from middleware)
    const userHeader = req.headers.get("x-user");
    const user = userHeader ? JSON.parse(userHeader) : null;

    

    //  protect route (enable when ready)
    // if (!user || user.role !== "admin") {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const result = await userService.getUsers({
      page,
      limit,
      email,
      role,
    });

    // const result = await userService.getAllUsers();

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