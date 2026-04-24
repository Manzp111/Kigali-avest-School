import { NextRequest, NextResponse } from "next/server";
import { GalleryService } from "@/lib/services/gallery.service";
import { updateGallerySchema } from "@/lib/validators/gallery/gallery.validation";

//  GET SINGLE ITEM
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Await params in newer Next.js versions
) {
  try {
    const { id } = await params;
    const data = await GalleryService.getById(id);

    if (!data) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * PATCH: Update details or toggle published status
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const contentType = req.headers.get("content-type") || "";

    let updateData: any;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      updateData = {
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        type: formData.get("type") as "background" | "gallery",
        published: formData.get("published") === "true",
        // Only include imageUrl if a new image was uploaded to Cloudinary
        ...(formData.get("imageUrl") && { imageUrl: formData.get("imageUrl") as string }),
      };
    } else {
      // Handle simple JSON updates (like the Publish toggle)
      updateData = await req.json();
    }

    const result = await GalleryService.update(id, updateData);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * DELETE: Remove image record
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await GalleryService.remove(id);
    return NextResponse.json({ message: "Successfully deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}