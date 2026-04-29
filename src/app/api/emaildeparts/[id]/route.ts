import { NextResponse ,NextRequest } from "next/server";
import sql from "mssql";
import { executeStoredProcedure } from "@/lib/dal/dbutils";


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

    const result = await executeStoredProcedure("GetEmailConcernDepartByCAPAID", {
      CAPAID : { type: sql.Int, value: id  },
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
