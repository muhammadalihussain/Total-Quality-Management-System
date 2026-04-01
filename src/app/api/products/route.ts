import { NextResponse,NextRequest } from "next/server";
import sql from "mssql";
import { executeStoredProcedure } from "@/lib/dal/dbutils";
import { getAllProductsBySearch } from "@/lib/dal/productdbutils";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q");
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 10;
    const orderBy = searchParams.get("orderBy") || "Id";
    const orderDir = searchParams.get("orderDir") || "DESC";

    const result = await getAllProductsBySearch(
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


// INSERT
export async function POST(req: Request) {
  try {
    const body = await req.json();
     const result = await executeStoredProcedure("sp_Product_Insert", {

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

    return NextResponse.json({
      success: true,
      message: "Inserted successfully",
    });
  } catch (err: any) {
   return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}