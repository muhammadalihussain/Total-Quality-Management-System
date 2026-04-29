import { NextResponse ,NextRequest  } from "next/server";
import sql from "mssql";
import { executeStoredProcedure } from "@/lib/dal/dbutils";

// =====================
// UPDATE
// =====================
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is missing" },
        { status: 400 }
      );
    }

    const body = await req.json();

    await executeStoredProcedure("sp_Certifications_Update", {
      Id: { type: sql.Int, value: id },
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

    return NextResponse.json({ message: "Updated" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// DELETE
// =====================
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await executeStoredProcedure("sp_Certifications_Delete", {
      Id: { type: sql.Int, value: parseInt(id) },
    });

    return Response.json({ message: "Deleted" });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}


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

    const result = await executeStoredProcedure("sp_Certifications_GetAllByProductId", {
      ProductId : { type: sql.Int, value: id  },
    });




    return NextResponse.json({
      success: true,
      message: "success",
      data: result.recordsets[0]
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
