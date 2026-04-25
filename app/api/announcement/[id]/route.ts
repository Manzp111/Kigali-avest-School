import { NextRequest, NextResponse } from "next/server";
import { announcementService } from "@/lib/services/announcement.service";
import { updateAnnouncementSchema } from "@/lib/validators/announcement.validator";
import { verifyAuth } from "@/lib/utils/tokenVerify";

// ✅ Next.js 16 requires params as Promise
type Params = Promise<{ id: string }>;

// ======================
// GET
// ======================
export async function GET(
  req: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;
  try {
  const auth = await verifyAuth(req);

if (!auth.success) {
  return auth.response;
}
  const data = await announcementService.getById(id);

  if (!data) {
    return NextResponse.json(
      { success: false, message: "Announcement not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    announcement: data,
  });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ======================
// PATCH
// ======================
export async function PATCH(
  req: NextRequest,
  { params }: { params: Params }
) {
  try {
    const auth = await verifyAuth(req);

    if (!auth.success) {
      return auth.response;
    }
    const { id } = await params;

    const body = await req.json();

    const result = updateAnnouncementSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await announcementService.update(id, result.data);

    return NextResponse.json({
      success: true,
      announcement: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal error" },
      { status: 500 }
    );
  }
}

// ======================
// DELETE
// ======================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;

    const auth = await verifyAuth(req);

    if (!auth.success) {
      return auth.response;
    }

    await announcementService.remove(id);

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal error" },
      { status: 500 }
    );
  }
}