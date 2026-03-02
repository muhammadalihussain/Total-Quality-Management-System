export const runtime = "nodejs";


import { NextResponse } from "next/server";
import { pool } from '@/lib/db';
import { comparePassword } from '@/utils/hash'; // or relative path
 import { generateToken } from '@/lib/jwt';

export async function POST(req: Request) {
  const { email, password } = await req.json();


    const db = await pool(); // Singleton pool
    const result = await db.request()
      .input('Email', email)
      .execute('sp_LoginUser');

    const user = result.recordset[0];
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

console.log("Password entered:", password);
console.log("Stored hash:", user.PasswordHash);
console.log("Compare result:", await comparePassword(password, user.PasswordHash));

  const isMatch = await comparePassword(password, user.PasswordHash);
  if (!isMatch) return NextResponse.json({ message: "Invalid password" }, { status: 401 });

  const token = generateToken(user);

  return NextResponse.json({ message: "Login successful", token });

}

// Optional: handle GET requests if needed
export async function GET(req: Request) {
  return NextResponse.json({ message: "Login endpoint — use POST" });
}