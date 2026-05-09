import { NextResponse } from "next/server";

import { getAllUsersBySearch } from "@/lib/dal/userdbutils"; 


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q");
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 10;
    const orderBy = searchParams.get("orderBy") || "UserId";
    const orderDir = searchParams.get("orderDir") || "DESC";

    const result = await getAllUsersBySearch(
      q,
      page,
      size,
      orderBy,
      orderDir
    );



    return NextResponse.json(result);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}