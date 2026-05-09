import { pool } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1]!;
  const decoded: any = verifyToken(token);

  const db = await pool();
  const result = await db
    .request()
    .input("RoleId", decoded.RoleId)
    .execute("sp_GetMenusByRole");

  return NextResponse.json(result.recordset);
}