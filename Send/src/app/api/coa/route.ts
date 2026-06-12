
import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure} from '@/lib/dal/dbutils';
import sql from "mssql";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID ,FromDepartmentID ,customer ,ItemName } = body;

       const result = await executeQuery('sp_CreateCOA', {
           Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID ,FromDepartmentID,customer ,ItemName
        });


        return NextResponse.json({ success: true, data: 'test' });
    } catch (error :any) {
        console.error('Error creating CAPA:', error);
        return NextResponse.json(
            { success: false, error: error },
            { status: 500 }
        );
    }
}

