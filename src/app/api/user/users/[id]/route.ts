import { NextResponse,NextRequest } from "next/server";
import sql from "mssql";
import { executeStoredProcedure } from "@/lib/dal/userdbutils"; 
import bcrypt from "bcryptjs";
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // <-- params is now a Promise
) {

    
  try {
    // Await params before using it
    const { id } = await context.params;

    if (!id) {
    return NextResponse.json(
      { success: false, message: "ID is missing" },
      { status: 400 }
    );
  }

    const result = await executeStoredProcedure("sp_DeleteUser", {
      UserID: { type: sql.Int, value: id },
    });
    
    return NextResponse.json({
      success: result.recordsets[0][0][""]=="User has been deleted" ?true:false,
      message: result.recordsets[0][0][""],
      data: result.recordsets[0][0][""]
    });
  } catch (error:any) {

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Delete failed",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID is missing" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    const { username,email,rawpassword,isActive,role_Id,sitesIds} = body

    console.log(role_Id);
      const salt = await bcrypt.genSalt(10);
      const hashedPasswordCovert = await bcrypt.hash(rawpassword, salt);
      const result = await executeStoredProcedure("sp_UpdateUser", {
         
         UserID: { type: sql.Int, value: parseInt(id) },
            username: {
            type: sql.NVarChar,
            value: username,
          },
    
          email: {
            type: sql.NVarChar,
            value: email,
          },
    
          passwordhash: {
            type: sql.NVarChar,
            value: hashedPasswordCovert,
          },
            rawpassword: {
            type: sql.NVarChar,
            value: rawpassword,
          },
          isActive: {
            type: sql.NVarChar,
            value: isActive,
          },
    
          role_id: {
            type: sql.NVarChar,
            value: role_Id,
          },
       
          site_Ids: {
            type: sql.NVarChar,
            value: sitesIds,
          },
        
        });
    
        

      return NextResponse.json({
      success: result.recordsets[0][0][""]=="update user successfully" ?true:false,
      message: result.recordsets[0][0][""],
      data: result.recordsets[0][0][""]
    });
  } catch (error:any) {

    return NextResponse.json(
      {
        success: false,
        message: error.message || "update failed",
      },
      { status: 500 }
    );
  }
}