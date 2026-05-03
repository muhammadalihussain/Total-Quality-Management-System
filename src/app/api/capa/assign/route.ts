import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure} from '@/lib/dal/dbutils';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { CAPAID, UserIDs, TargetDate, ClosureDate, StatusId ,CreatedBy } = body;


const result = await executeQuery('sp_AssignCAPA_MultipleUsers', {
          CAPAID, UserIDs, TargetDate, ClosureDate, StatusId ,CreatedBy 
        });

 

    return Response.json({ success: true });

  } catch (err: any) {
    return Response.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}