import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure} from '@/lib/dal/dbutils';
import sql from "mssql";
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { Title, Description, CreatedBy, Department } = body;

        const result = await executeQuery('sp_CreateCAPA', {
            Title,
            Description,
            CreatedBy,
            Department
        });

        return NextResponse.json({ success: true, data: result[0] });
    } catch (error) {
        console.error('Error creating CAPA:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create CAPA' },
            { status: 500 }
        );
    }
}

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



console.log(result.recordsets[0])
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
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { CAPAID, Status } = body;

        await executeQuery(`
            UPDATE CAPA
            SET Status = @Status, UpdatedAt = GETDATE()
            WHERE CAPAID = @CAPAID
        `, { CAPAID, Status });

        return NextResponse.json({ success: true, message: 'CAPA updated successfully' });
    } catch (error) {
        console.error('Error updating CAPA:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update CAPA' },
            { status: 500 }
        );
    }
}