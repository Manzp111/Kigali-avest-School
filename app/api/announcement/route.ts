import { NextRequest, NextResponse } from "next/server";
import { announcementService } from "@/lib/services/announcement.service";
import { createAnnouncementSchema } from "@/lib/validators/announcement.validator";
import { verifyAuth } from "@/lib/utils/tokenVerify";
import { withErrorHandler } from "@/lib/utils/db-safe";

export type AuthPayload = {
  userId: string;
  role?: string;
};

async function requirePostAuth(req: NextRequest): Promise<AuthPayload> {
  const auth = await verifyAuth(req);

  if (!auth.success || !auth.payload) {
    throw new Error("UNAUTHORIZED");
  }

  return auth.payload;
}


export const POST = withErrorHandler(async (req: NextRequest) => {
  const user = await requirePostAuth(req);

  const body = await req.json();

  const result = createAnnouncementSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.flatten() },
      { status: 400 }
    );
  }

  const announcement = await announcementService.create({
    ...result.data,
    userId: user.userId,
  });

  return NextResponse.json({
    success: true,
    announcement,
  });
});



export const GET = withErrorHandler(async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const isPublishedParam = searchParams.get("isPublished");
  const isPublished =
    isPublishedParam === "true"
      ? true
      : isPublishedParam === "false"
      ? false
      : undefined;

  const userId = searchParams.get("userId") || undefined;
  const search = searchParams.get("search") || undefined;
  const sortBy =
    (searchParams.get("sortBy") as "createdAt" | "updatedAt") ??
    "createdAt";

  const order =
    (searchParams.get("order") as "asc" | "desc") ?? "desc";

  const result = await announcementService.getAll({
    page,
    limit,
    isPublished,
    userId,
    search,
    sortBy,
    order,
  });

  return NextResponse.json({
    success: true,
    ...result,
  });
});