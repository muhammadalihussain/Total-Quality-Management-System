import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {addUser}  from '@/lib/dal/userdbutils';

export async function POST(req: Request) {

  const { username,email,rawpassword,isActive,role_Id,sitesIds} = await req.json();

  const salt = await bcrypt.genSalt(10);
  const hashedPasswordCovert = await bcrypt.hash(rawpassword, salt);

  try {
    const newUser = {
      username,
      email,
      passwordhash: hashedPasswordCovert,
      rawpassword,
      isActive,
      sitesIds,
      role_Id,
    };


    const adduser :any = await addUser(newUser);

    if (adduser[0][0][""] === "Email Exists") {
      return NextResponse.json({ error: "Email Exists" }, { status: 400 });
      
    } else {
     //return NextResponse.json({ message: "User registered successfully" });
      return NextResponse.json({success: true });
     
    }

    
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

