import { NextRequest, NextResponse } from "next/server";
import { GalleryService } from "@/lib/services/gallery.service";
import { updateGallerySchema } from "@/lib/validators/gallery/gallery.validation";
import { verifyAuth } from "@/lib/utils/tokenVerify";

type Params = Promise<{ id: string }>;

// =====================
// GET
// =====================
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
    const data = await GalleryService.getById(id);

    if (!data) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

// =====================
// PATCH
// =====================
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

    const contentType = req.headers.get("content-type") || "";

    let updateData: any;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      updateData = {
        title: formData.get("title") ?? undefined,
        subtitle: formData.get("subtitle") ?? null,
        type: formData.get("type") ?? undefined,
        published: formData.get("published") === "true",
        imageUrl: formData.get("imageUrl") ?? undefined,
      };
    } else {
      updateData = await req.json();
    }

    const result = await GalleryService.update(id, updateData);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

// =====================
// DELETE
// =====================
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

    await GalleryService.remove(id);

    return NextResponse.json({
      message: "Successfully deleted",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}