import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure ,executeNonQuery} from '@/lib/dal/dbutils';






export async function POST(request: NextRequest) {
    try {
         const body = await request.json();
        const { Id ,FieldName, Value ,UserID,COAID} = body;

        //console.log(Id+FieldName+Value )

      const result = await executeQuery('sp_UpdateSingleFieldQATestResult', {
          Id ,FieldName, Value ,UserID,COAID
        });


        return NextResponse.json({ success: true, message: 'CAPA updated successfully' });
    } catch (error) {
        console.error('Error updating CAPA:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update CAPA' },
            { status: 500 }
        );
    }
}

   

   




