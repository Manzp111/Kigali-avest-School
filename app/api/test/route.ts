import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // adjust if different
import { announcements } from "@/lib/db/schema"; // adjust path

export async function GET() {
  try {
    const data = await db
      .select()
      .from(announcements)
      .orderBy(announcements.createdAt);

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    // console.error("ANNOUNCEMENTS TEST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch announcements",
      },
      { status: 500 }
    );
  }
}