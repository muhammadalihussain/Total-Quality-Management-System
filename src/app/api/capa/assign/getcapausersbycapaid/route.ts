import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure} from '@/lib/dal/dbutils';

import sql from "mssql";



export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { CAPAID } = body;



    const result = await executeStoredProcedure("sp_GetAllCapaAssignUsersByCAPAID", {
   CAPAID: { type: sql.Int, value: parseInt(CAPAID) },
    });



    return NextResponse.json({
      success: true,
      message: "success",
      data: result.recordset
    });


  } catch (error) {
    console.error('Error fetching CAPAs:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to fetch CAPAs' },
      { status: 500 }
    );
  }
}
