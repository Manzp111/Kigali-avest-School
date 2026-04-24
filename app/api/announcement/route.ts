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



export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // 📄 Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    // 🔍 Filters
    const isPublished = searchParams.get("isPublished");
    const userId = searchParams.get("userId");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";

    // 📦 Fetch all first (you can optimize later in repo with SQL filters)
    const data = await announcementService.getAll();

    // 🔎 Filtering
    let filtered = data;

    if (isPublished !== null) {
      filtered = filtered.filter(
        (a) => a.isPublished === (isPublished === "true")
      );
    }

    if (userId) {
      filtered = filtered.filter((a) => a.userId === userId);
    }

    if (search) {
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📊 Sorting
    filtered.sort((a: any, b: any) => {
      const valA = new Date(a[sortBy]).getTime();
      const valB = new Date(b[sortBy]).getTime();

      return order === "asc" ? valA - valB : valB - valA;
    });

    // 📄 Pagination slice
    const paginated = filtered.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      data: paginated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}