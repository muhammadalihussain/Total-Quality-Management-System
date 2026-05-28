import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure} from '@/lib/dal/dbutils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { CAPAID, TargetDate, ClosureDate, StatusId ,CreatedBy,RejectRemarks  } = body;
    const result = await executeQuery('sp_AcceptOrRecjectCAPA', {
          CAPAID,  TargetDate, ClosureDate, StatusId ,CreatedBy ,RejectRemarks
        });

 

    return Response.json({ success: true });

  } catch (err: any) {
    return Response.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}