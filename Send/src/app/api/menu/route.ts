import { pool } from "@/lib/db";
import { getPayloadEdge } from "@/lib/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  //const token = req.headers.get("authorization")?.split(" ")[1]!;
    const token = req.cookies.get("token")?.value;

    

  // If no token → 
  if (!token) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const user = await getPayloadEdge(token);

  const db = await pool();
  const result = await db
    .request()
    .input("RoleId", user?.RoleId)
    .execute("sp_GetMenusByRole");

  return NextResponse.json(result.recordset);
}