import { NextRequest, NextResponse } from "next/server";
import { GalleryService } from "@/lib/services/gallery.service";
import { createGallerySchema } from "@/lib/validators/gallery/gallery.validation";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_SIZE = 30 * 1024 * 1024; // 30MB

export async function GET() {
  const data = await GalleryService.getAll();
  return NextResponse.json(data);
}
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // 1. Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Upload to Cloudinary using a Stream
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "khs_gallery", // This creates a folder in Cloudinary
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as any;

    // 3. Save to DB using the Cloudinary URL
    const result = await GalleryService.create({
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      buttonText: formData.get("buttonText") as string,
      priority: Number(formData.get("priority") || 0),
      imageUrl: uploadResult.secure_url, // This is the 'https://...' link
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}