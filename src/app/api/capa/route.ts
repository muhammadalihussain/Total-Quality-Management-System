import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure} from '@/lib/dal/dbutils';
import sql from "mssql";
import nodemailer from 'nodemailer';


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID ,FromDepartmentID ,customer ,ItemName } = body;

/*
console.log("Description="+Description)
console.log( "CreatedBy="+CreatedBy)
console.log("SalesId="+ SalesId)
console.log("Site"+Site)
console.log("ItemId"+ItemId)
console.log("ToDepartmentID"+ToDepartmentID)
console.log("ItemVarietyID"+ItemVarietyID )
console.log("FromDepartmentID"+FromDepartmentID )
console.log("customer"+customer);
*/

      const result = await executeQuery('sp_CreateCAPA', {
           Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID ,FromDepartmentID,customer ,ItemName
        });

      /*

        // CONFIGURE THESE VALUES:
const SMTP_CONFIG = {
  host: "192.168.11.17",
  port: 2500,
  username: 'mfl.cms@matcofoods.com.pk',  // ← CHANGE THIS
  password: 'm@tco123',  // ← CHANGE THIS
  from: "muhammad.ali@matcofoods.com.pk",      // ← CHANGE THIS
  to: "muhammad.ali@matcofoods.com.pk"      // ← CHANGE THIS
};


  const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,

    auth: {
      user: SMTP_CONFIG.username,
      pass: SMTP_CONFIG.password
    }
  });

  try {
    let result = await transporter.sendMail({
      from: SMTP_CONFIG.from,
      to: SMTP_CONFIG.to,
      subject: 'Test from Node.js',
      text: 'Hello! This is a test email.'
    });
    console.log('✅ Success! Email sent:', result.messageId);
  } catch (error) {
    console.error('❌ Failed:', error);
  }

         // ✅ HTML TEMPLATE
    const htmlTemplate = `
      <div style="font-family: Arial; padding: 10px;">
        <h2 style="color: #2563eb;">New CAPA Created</h2>

        <p><strong>Customer:</strong> ${customer}</p>
        <p><strong>Sales Order:</strong> ${SalesId}</p>
        <p><strong>Description:</strong> ${Description}</p>

        <hr/>
        <p style="font-size:12px;color:gray;">
          This is auto generated email from CAPA system
        </p>
      </div>
    `;



       // console.log(Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID,FromDepartmentID);
*/
        return NextResponse.json({ success: true, data: 'test' });
    } catch (error) {
        console.error('Error creating CAPA:', error);
        return NextResponse.json(
            { success: false, error: error },
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