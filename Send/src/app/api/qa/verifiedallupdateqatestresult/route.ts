import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure ,executeNonQuery} from '@/lib/dal/dbutils';






export async function POST(request: NextRequest) {
    try {
         const body = await request.json();
        const { COAID  ,UserID} = body;

        //console.log(Id+FieldName+Value )

      const result = await executeQuery('sp_VerifiedAllTestResultByCOAID', {
         COAID ,UserID
        });

console.log(result[0][''] );
        return NextResponse.json({ success: true, message: result[0][''] });
    } catch (error) {
        console.error('Error updating CAPA:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update CAPA' },
            { status: 500 }
        );
    }
}

   

   




