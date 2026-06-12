import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure ,executeNonQuery} from '@/lib/dal/dbutils';



export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { COAID ,PreparedBy, ItemVarietyID} = body;

  
      const result = await executeQuery('sp_RefreshAgainGenerateQCTestResults', {
          COAID ,PreparedBy, ItemVarietyID 
        });


    
        return NextResponse.json({ success: true, message: ' updated successfully' });
    } catch (error) {
        console.error('Error updating CAPA:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update ' },
            { status: 500 }
        );
    }
}




export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const Id = searchParams.get('id');

  if (!Id) {
  throw new Error("CAPAID is required");
}

      const results = await executeQueryWithMultipleResults('sp_ProductAnalysis_GetAllTestResultbyCOAID', {
        COAID: parseInt(Id ?? 0)
      });

      return NextResponse.json({ success: true, data: results[0] });

}

