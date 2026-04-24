import { NextRequest, NextResponse } from "next/server";
import { GalleryService } from "@/lib/services/gallery.service";
import { updateGallerySchema } from "@/lib/validators/gallery/gallery.validation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await GalleryService.getById(params.id);
  return NextResponse.json(data);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const data = updateGallerySchema.parse(body);

    const result = await GalleryService.update(params.id, data);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const result = await GalleryService.remove(id);

    if (!result.length) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Deleted successfully",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to delete", error: error.message },
      { status: 500 }
    );
  }
}