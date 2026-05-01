import { NextResponse, NextRequest } from "next/server";
import { userService } from "@/lib/services/user.service";
import { verifyAuth } from "@/lib/utils/tokenVerify";
import { updateUserSchema } from "@/lib/validators/auth/user.validator";

// 🔎 GET USER BY ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 🔐 AUTH CHECK
    const auth = await verifyAuth(req);
    if (!auth.success) return auth.response;

    const { id } = await params;

    const user = await userService.getUserById(id);

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "User not found",
      },
      { status: 404 }
    );
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAuth(req);
    if (!auth.success) return auth.response;

    const currentUser = auth.payload!;

    
    const { id } = await params;

    const body = await req.json();
    const parsed = updateUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const isHeadmaster = currentUser.role === "Headmaster";

    if (!isHeadmaster) {
      delete data.role;
      delete data.isVerified;
    }

    if (!isHeadmaster && currentUser.userId !== id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const updated = await userService.updateUser(id, data);

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updated,
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Update failed",
      },
      { status: 400 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    //  AUTH CHECK
    const auth = await verifyAuth(req);
    if (!auth.success) return auth.response;

    const { id } = await params;

    const deleted = await userService.deleteUser(id);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
      data: deleted,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Delete failed",
      },
      { status: 404 }
    );
  }
}