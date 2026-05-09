import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure} from '@/lib/dal/dbutils';
import sql from "mssql";



export async function POST(req: Request) {
  try {
    const { CAPAID ,AssignmentID } = await req.json();

     const result = await executeStoredProcedure("sp_DeleteAssignCAPAUser", {
   CAPAID: { type: sql.Int, value: parseInt(CAPAID) },
   AssignmentID: { type: sql.Int, value: parseInt(AssignmentID) },
    });

    return Response.json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (err: any) {
    return Response.json(
      {
        success: false,
        message: err.message
      },
      { status: 400 }
    );
  }
}