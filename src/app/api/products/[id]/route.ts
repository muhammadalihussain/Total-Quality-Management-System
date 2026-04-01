import { NextResponse,NextRequest } from "next/server";
import sql from "mssql";
import { executeStoredProcedure } from "@/lib/dal/userdbutils"; 
import bcrypt from "bcryptjs";




// ✅ GET PRODUCT BY ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

 try {
  const { id } = await context.params; // 🔥 IMPORTANT

    if (!id) {
    return NextResponse.json(
      { success: false, message: "ID is missing" },
      { status: 400 }
    );
  }

    const result = await executeStoredProcedure("sp_GetProductDetailByID", {
      Id : { type: sql.Int, value: id  },
    });


    return NextResponse.json({
      success: true,
      message: "success",
      data: result.recordsets[0][0]
    });


  } catch (error:any) {

    return NextResponse.json(
      {
        success: false,
        message: error.message || "failed",
      },
      { status: 500 }
    );
  }

}







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

    const result = await executeStoredProcedure("sp_Product_Delete", {
      Id: { type: sql.Int, value: id },
    });
    
    return NextResponse.json({
      success: result.recordsets[0][0][""]=="Product has been deleted" ?true:false,
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
  await executeStoredProcedure("sp_Product_Update", {
 Id: { type: sql.Int, value: id },

    ProductName: {
            type: sql.NVarChar,
            value: body.ProductName,
          },

          ProductCode: {
            type: sql.NVarChar,
            value: body.ProductCode,
          },

           CategoryID: {
            type: sql.Int,
            value: parseInt(body.CategoryID)  ,
          },


            FormID : {
            type: sql.Int,
            value: parseInt(body.FormID)   ,
          },

            ColorID : {
            type: sql.Int,
            value: parseInt(body.ColorID)  ,
          },

            CountryOfOrigin: {
            type: sql.NVarChar,
            value: body.CountryOfOrigin,
          },

            Ingredients : {
            type: sql.NVarChar,
            value: body.Ingredients ,
          },
            IngredientsDeclaration: {
            type: sql.NVarChar,
            value: body.IngredientsDeclaration,
          },
            SuitableFor: {
            type: sql.NVarChar,
            value: body.SuitableFor,
          },
            Additives : {
            type: sql.NVarChar,
            value: body.Additives ,
          },
            Functionalities: {
            type: sql.NVarChar,
            value: body.Functionalities,
          },
            Description: {
            type: sql.NVarChar,
            value: body.Description,
          },
            ShelfLife: {
            type: sql.NVarChar,
            value: body.ShelfLife,
          },
            StorageConditions: {
            type: sql.NVarChar,
            value: body.StorageConditions,
          },
            Uses: {
            type: sql.NVarChar,
            value: body.Uses,
          },

          IsActive: {
            type: sql.Bit,
            value: body.IsActive,
          },

        });

    return NextResponse.json({ message: "Updated" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}