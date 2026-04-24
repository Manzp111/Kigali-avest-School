import { NextResponse } from "next/server";
import { announcementService } from "@/lib/services/announcement.service";
import { updateAnnouncementSchema } from "@/lib/validators/announcement.validator";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await announcementService.getById(params.id);

  return NextResponse.json({
    success: true,
    announcement: data,
  });
}

// PATCH (partial update)
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

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
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await announcementService.remove(params.id);

  return NextResponse.json({
    success: true,
    message: "Deleted successfully",
  });
}