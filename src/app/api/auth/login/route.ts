import { pool } from "@/lib/db";
import { signToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password ,site } = await req.json();
  const db = await pool();

  const result = await db
    .request()
    .input("Email", email)
    .input("SiteID", site)
    .execute("sp_LoginUser");

  const user = result.recordset[0];
  

  if (!user) return NextResponse.json({ error: "Invalid login" }, { status: 401 });

  const match = await bcrypt.compare(password, user.PasswordHash);
  
  if (!match) return NextResponse.json({ error: "Invalid login" }, { status: 401 });

  const urls = await db.request()
  .input("RoleId", user.RoleId)
  .execute("sp_GetAllowedUrls");

const allowedUrls = urls.recordset.map((r:any)=>r.Url);



  const token = signToken({
    UserID: user.UserID,
    RoleId: user.RoleId,
    Email:user.Email,
    Username:user.Username,
    urls: allowedUrls

  });

  if(token)
  {
    
       // Response JSON
    const response = NextResponse.json({
      message: "Login successful",
      RoleId: user.RoleId,
      UserID: user.UserID,
      Email:user.Email,
      Username:user.Username,
      urls: allowedUrls

    });

    // Save token in HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,   // secure: cannot access via JS
      secure: false,    // true in production (HTTPS)
      path: "/",        // available on all pages
      maxAge: 60 * 60 * 24, // 1 day
    });

    

    return response;
  }
  

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}