import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/lib/services/user.service";
import { verifyAuth } from "@/lib/utils/tokenVerify";

export async function GET(req: NextRequest) {
  try {
    
    //  AUTH CHECK
    const auth = await verifyAuth(req);

    if (!auth.success) {
      return auth.response;
    }

    const user = auth.payload!;
  

    const { searchParams } = new URL(req.url);

    //  pagination
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit")) || 10));

    const email = searchParams.get("email");


    //  filters
    const filters: any = {
      page,
      limit,
      email,
    };

    // ROLE CONTROL 
    switch (user.role) {
      case "Headmaster":
        break;

      case "teacher":
        filters.userId = user.userId;
        break;

      default:

        return NextResponse.json(
          { success: false, message: "Forbidden" },
          { status: 403 }
        );
    }


    const result = await userService.getUsers(filters);

  


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