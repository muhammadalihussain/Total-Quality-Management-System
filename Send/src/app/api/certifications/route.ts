import { NextResponse,NextRequest } from "next/server";
import sql from "mssql";
import { executeStoredProcedure } from "@/lib/dal/dbutils";


// INSERT
export async function POST(req: Request) {
  try {
    const body = await req.json();


       const result = await executeStoredProcedure("sp_Certifications_Insert", {

         ProductId: { type: sql.Int, value: parseInt(body.ProductId) },
            CertificationName: {
            type: sql.NVarChar,
            value: body.CertificationName,
          },


          IsActive: {
            type: sql.Bit,
            value: body.IsActive,
          },

        });


    return NextResponse.json({ message: "Inserted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}