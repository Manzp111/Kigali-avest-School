import { NextResponse } from "next/server";
import { announcementService } from "@/lib/services/announcement.service";
import { createAnnouncementSchema } from "@/lib/validators/announcement.validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = createAnnouncementSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const announcement = await announcementService.create(result.data);

    return NextResponse.json({
      success: true,
      announcement,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  const data = await announcementService.getAll();

  return NextResponse.json({
    success: true,
    count: data.length,
    announcements: data,
  });
}