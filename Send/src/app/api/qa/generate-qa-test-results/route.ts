import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure ,executeNonQuery} from '@/lib/dal/dbutils';



export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { COAID ,PreparedBy, ItemVarietyID} = body;

      const result = await executeQuery('sp_GenerateQCTestResults', {
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

      const results = await executeQueryWithMultipleResults('sp_ProductAnalysis_GetAllTestResultbyCOAID', {
        COAID: parseInt(Id)
      });

      return NextResponse.json({ success: true, data: results[0]});
    
}



/*
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const capaId = searchParams.get('id');
    const status = searchParams.get('status'); // ✅ ADD THIS

    // 🔹 GET BY ID
    if (capaId) {
      const results = await executeQueryWithMultipleResults('sp_GetCAPADetails', {
        CAPAID: parseInt(capaId)
      });

      return NextResponse.json({ success: true, data: results });
    }


    const result = await executeStoredProcedure("sp_GetCAPADetailsWithStatus", {
      status : { type: sql.NVarChar, value: status  },
    });

    return NextResponse.json({
      success: true,
 
      data: result.recordsets[0]
    });



  } catch (error) {
    console.error('Error fetching CAPAs:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to fetch CAPAs' },
      { status: 500 }
    );
  }
}

*/


export async function PUT(request: NextRequest) {
    try {
         const body = await request.json();
        const { CAPAID, Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID ,FromDepartmentID ,customer ,ItemName } = body;

   const result = await executeQuery('sp_UpdateCAPA', {
          CAPAID, Description, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID ,FromDepartmentID,customer ,ItemName
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

