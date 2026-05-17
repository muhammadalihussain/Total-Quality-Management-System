import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure} from '@/lib/dal/dbutils';
import sql from "mssql";
import nodemailer from 'nodemailer';


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID ,FromDepartmentID ,customer ,ItemName } = body;



      const result = await executeQuery('sp_CreateCAPA', {
           Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID ,FromDepartmentID,customer ,ItemName
        });



       // console.log(Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID,FromDepartmentID);

        return NextResponse.json({ success: true, data: 'test' });
    } catch (error) {
        console.error('Error creating CAPA:', error);
        return NextResponse.json(
            { success: false, error: error },
            { status: 500 }
        );
    }
}




export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);


  const UserID = searchParams.get("UserID") || "";
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 20;

  const capaId = searchParams.get('id');


    // 🔹 GET BY ID
    if (capaId) {
      const results = await executeQueryWithMultipleResults('sp_GetCAPADetails', {
        CAPAID: parseInt(capaId)
      });

      return NextResponse.json({ success: true, data: results });
    }

const results = await executeQueryWithMultipleResults('sp_GetAssignCAPAByUserIDOnlyForQA', {
       UserID:UserID, Search: (search),Status:(status),pageSize:pageSize,PageNo:page
      });
    
    //  console.log(results[0]?.[0].TotalRecords)
    //  console.log(results[1])

  return Response.json({
    total: results[0]?.[0].TotalRecords,
    data: results[1],
  });
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

