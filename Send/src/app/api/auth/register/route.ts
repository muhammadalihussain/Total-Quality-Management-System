import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {addUser}  from '@/lib/dal/userdbutils';

export async function POST(req: Request) {

  const { username,email,rawpassword,isActive,role_Id,sitesIds,departmentId} = await req.json();



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
      departmentId
    };



  const adduser :any = await addUser(newUser);

  if (adduser?.[0]?.Message === "Email Exists") {

       console.log(adduser?.[0]?.Message)
      return NextResponse.json({ error: "Email Exists" });
      
    } else {
     //return NextResponse.json({ message: "User registered successfully" });
      return NextResponse.json({success: true });
     
    }

    
  } catch (error :any) {
   console.log(error)
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

