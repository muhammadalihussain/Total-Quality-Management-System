// app/api/effectiveness/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pool} from '@/lib/db';
import sql from "mssql";
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { AssignmentID, IsEffective, Remarks } = body;

   const db = await pool(); // Singleton pool
    const result = await db.request()
      .input('AssignmentID', sql.VarChar(20), AssignmentID)
      .input('IsEffective', sql.Bit, IsEffective)
      .input('Remarks', sql.NVarChar(500), Remarks)
      .execute('sp_MarkEffectiveness');

    return NextResponse.json(result.recordset[0]);
  } catch (error) {
    console.error('Error marking effectiveness:', error);
    return NextResponse.json({ error: 'Failed to mark effectiveness' }, { status: 500 });
  }
}