import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure ,executeNonQuery} from '@/lib/dal/dbutils';



export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { ActionTaken, IsEffective,VerifiedBy,CAPAID,Remarks } = body;


       
      const result = await executeQuery('sp_AllCAPAActionsIsEffective', {
          ActionTaken, IsEffective,VerifiedBy,CAPAID,Remarks 
        });


        return NextResponse.json({ success: true, message: ' updated successfully' });
    } catch (error : any) {
        console.error('Error updating CAPA:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update ' },
            { status: 500 }
        );
    }
}

