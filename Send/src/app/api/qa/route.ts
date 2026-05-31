import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure ,executeNonQuery} from '@/lib/dal/dbutils';
import sql from "mssql";
import nodemailer from 'nodemailer';


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { PreparedBy,lotNumber, SalesId,Site,ItemId,ItemVarietyID  ,ItemName,ProductionDate ,ExpiryDate,RFNItemNumber ,ACCOUNTNUM } = body;


      const result = await executeStoredProcedure('sp_CreateCOA', {
           PreparedBy, SalesId,Site,ItemId,ItemVarietyID  ,ItemName,ProductionDate ,ExpiryDate,RFNItemNumber ,ACCOUNTNUM ,lotNumber
        });


       if (!result) {
         return NextResponse.json(
        { success: false, message: 'No result returned from database' },
        { status: 500 }
      );
    }

    if (result.recordset && result.recordset[0]) {
      const responseMsg = result.recordset[0][''];

      if (responseMsg && responseMsg.includes('Alreay Exists')) {
       // console.log(responseMsg);
       return NextResponse.json({ success: false, message: responseMsg});

      }
    }

       // console.log(Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID,FromDepartmentID);

      return NextResponse.json({ success: true, message: 'success'});
    } catch (error :any) {

        console.error('Error creating COA:', error);

           if (error.code === 'EREQUEST' &&error.originalError?.info?.number) {

           return NextResponse.json(
            { success: false, message: error.originalError?.info.message },
            { status: 500 }
        );

      }



    }
}




export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);


 // const UserID = searchParams.get("UserID") || "";
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 20;

  const Id = searchParams.get('id');


    // 🔹 GET BY ID
    if (Id) {
      const results = await executeQueryWithMultipleResults('sp_GetCOADetails', {
        Id: parseInt(Id)
      });

      return NextResponse.json({ success: true, data: results });
    }

const results = await executeQueryWithMultipleResults('sp_GetCOA', {
        Search: (search),Status:(status),pageSize:pageSize,PageNo:page
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

