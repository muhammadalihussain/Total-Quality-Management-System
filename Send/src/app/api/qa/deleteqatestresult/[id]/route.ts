import { NextRequest, NextResponse } from "next/server";
import sql from "mssql";
import { executeStoredProcedure } from "@/lib/dal/dbutils";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await executeStoredProcedure("sp_deleteQCTestResult", {
      Id: {
        type: sql.Int,
        value: parseInt(id),
      },
    });

    return NextResponse.json({
      message: "Deleted",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}