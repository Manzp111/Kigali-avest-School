import { NextRequest, NextResponse } from "next/server";
import { GalleryService } from "@/lib/services/gallery.service";
import { createGallerySchema } from "@/lib/validators/gallery/gallery.validation";
import { v2 as cloudinary } from "cloudinary";
import { verifyAuth } from "@/lib/utils/tokenVerify";
import { withErrorHandler } from "@/lib/utils/db-safe";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const maxDuration = 60; // Max execution time in seconds for this API route
export const dynamic = 'force-dynamic';

const MAX_SIZE = 30 * 1024 * 1024; // 30MB

//  GET ALL



export const GET = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  // filters
  const typeParam = searchParams.get("type");
  const type =
    typeParam === "background" || typeParam === "gallery"
      ? typeParam
      : undefined;

  const publishedStr = searchParams.get("published");
  const published =
    publishedStr === "true"
      ? true
      : publishedStr === "false"
      ? false
      : undefined;

  // pagination
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const data = await GalleryService.getAll({
    type,
    published,
    page,
    limit,
  });

  return NextResponse.json({
    success: true,
    ...data,
  });
});

//  CREATE
export async function POST(req: NextRequest) {
  try {

    const auth = await verifyAuth(req);

  if (!auth.success) {
    return auth.response;
  }
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    //  FILE VALIDATION
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Image must be less than 30MB" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    //  CONVERT TO BUFFER
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    //  UPLOAD TO CLOUDINARY
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "khs_gallery",
            resource_type: "auto",
            timeout: 60000,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    //  PREPARE DATA
    // We include imageUrl here so the Zod schema can validate it in one go
      const rawData = {
        title: formData.get("title"),
        subtitle: formData.get("subtitle") || null,
        type: formData.get("type") ?? "gallery",
        published: formData.get("published") === "true",
        imageUrl: uploadResult.secure_url,
      };

    //  VALIDATE (This will now pass because imageUrl is present)
    // const validated = createGallerySchema.parse(rawData);
    const validated = createGallerySchema.parse({
  ...rawData,
  publicId: uploadResult.public_id, // ✅ ADD THIS
});

    //  SAVE TO DB
    const result = await GalleryService.create(validated);

    return NextResponse.json(
      {
        success: true,
        message: "Gallery item created successfully",
        data: result,
      }

      
    );

  } catch (err: any) {
    console.error("Gallery POST Error:", err);
    
    // Handle Zod validation errors specifically
    if (err.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}