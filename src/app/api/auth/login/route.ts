import { pool } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const db = await pool();

  const result = await db
    .request()
    .input("Email", email)
    .execute("sp_LoginUser");

  const user = result.recordset[0];
  if (!user) return NextResponse.json({ error: "Invalid login" }, { status: 401 });

  const match = await bcrypt.compare(password, user.PasswordHash);
  if (!match) return NextResponse.json({ error: "Invalid login" }, { status: 401 });

  const token = signToken({
    UserID: user.UserID,
    RoleId: user.RoleId,
  });

  return NextResponse.json({ token, RoleId: user.RoleId });
}