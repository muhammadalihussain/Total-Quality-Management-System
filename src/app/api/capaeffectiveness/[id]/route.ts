import { NextResponse ,NextRequest  } from "next/server";
import sql from "mssql";
import { executeStoredProcedure } from "@/lib/dal/dbutils";



// DELETE
// =====================
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await executeStoredProcedure("sp_CAPAActionsEffectiveness_Delete", {
      Id: { type: sql.Int, value: parseInt(id) },
    });

    return Response.json({ message: "Deleted" });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}


