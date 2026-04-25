import { NextRequest, NextResponse } from "next/server";
import { announcementService } from "@/lib/services/announcement.service";
import { createAnnouncementSchema } from "@/lib/validators/announcement.validator";
import { verifyAuth } from "@/lib/utils/tokenVerify";
import { withErrorHandler } from "@/lib/utils/db-safe";


export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAuth(req);

    if (!auth.success) {
      return auth.response;
    }
      
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




export const GET = withErrorHandler(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const isPublished = searchParams.get("isPublished");
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";

    const result = await announcementService.getAll({
      page,
      limit,
      isPublished:
        isPublished === null ? undefined : isPublished === "true",
      userId,
      search,
      sortBy,
      order,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  }
);