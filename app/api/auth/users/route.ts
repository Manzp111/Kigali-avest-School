import { NextResponse } from "next/server";
import { userService } from "@/lib/services/user.service";

export async function GET(req: Request) {
  try {
    // console.log("🚀 [USERS] request");

    //  get data from middleware
    const userHeader = req.headers.get("x-user");

    const user = userHeader ? JSON.parse(userHeader) : null;

    console.log("👤 Auth user:", user);

    // optional: block if not logged in
    // if (!user) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const users = await userService.getAllUsers();

    return NextResponse.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}