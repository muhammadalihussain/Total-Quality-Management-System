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

         const host = request.headers.get("host");
         const protocol = request.headers.get("x-forwarded-proto") || "http";

 const baseUrl = `${protocol}://${host}`

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New CAPA Created</title>
</head>

<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding:20px;">

      <!-- MAIN TABLE -->
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;">

        <!-- HEADER (NO GRADIENT FOR OUTLOOK) -->
        <tr>
          <td style="background:#2563eb;padding:20px;text-align:center;color:#ffffff;">
            <h2 style="margin:0;">CAPA Notification</h2>
            <p style="margin:5px 0 0;font-size:13px;">Corrective & Preventive Action System</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:20px;">

            <h3 style="margin-top:0;color:#111827;">New CAPA Created</h3>

            <p style="color:#4b5563;font-size:14px;">
              A new CAPA record has been created.
            </p>

            <!-- TABLE DATA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:15px;">

              <tr>
                <td style="border:1px solid #ddd;padding:8px;width:150px;font-weight:bold;">CAPA No</td>
                <td style="border:1px solid #ddd;padding:8px;">${result[0]?.CAPAID}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Customer</td>
                <td style="border:1px solid #ddd;padding:8px;">${customer}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Sales Order</td>
                <td style="border:1px solid #ddd;padding:8px;">${SalesId}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Product</td>
                <td style="border:1px solid #ddd;padding:8px;">${ItemName}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Created By</td>
                <td style="border:1px solid #ddd;padding:8px;">${result[0].CreatedBy}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Description</td>
                <td style="border:1px solid #ddd;padding:8px;">${Description}</td>
              </tr>

            </table>

            <!-- BUTTON (OUTLOOK SAFE) -->
            <table cellpadding="0" cellspacing="0" style="margin-top:20px;">
              <tr>
             <td style="padding:10px 0;">
  <a href="${baseUrl}/capa/${result[0]?.CAPAID}"
     style="
       color:#3b82f6;
       text-decoration:underline;
       font-family:Arial;
       font-size:14px;
     ">
    View CAPA
  </a>
</td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#6b7280;">
            This is an auto-generated email from CAPA System
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
        // CONFIGURE THESE VALUES:
const SMTP_CONFIG = {
  host: "192.168.11.17",  //192.168.11.17 //mail.matcofoods.com
  port: 2500,
  username: 'mfl.cms@matcofoods.com.pk',  // ← CHANGE THIS
  password: 'm@tco123',  // ← CHANGE THIS
  from: "mfl.cms@matcofoods.com.pk",      // ← CHANGE THIS
  to: result[0].Emails     // ← CHANGE THIS
};


  const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.username,
      pass: SMTP_CONFIG.password
    },

  tls: {
    rejectUnauthorized: false,
  },
  })
  try {
    let result = await transporter.sendMail({
      from: SMTP_CONFIG.from,
      to: SMTP_CONFIG.to,
      subject: 'New CAPA Created',
      html: htmlTemplate
    });
    //console.log('✅ Success! Email sent:', result.messageId);
  } catch (error) {
    console.error('❌ Failed:', error);
  }


       // console.log(Description, CreatedBy, SalesId,Site,ItemId,ToDepartmentID,ItemVarietyID,FromDepartmentID);

        return NextResponse.json({ success: true, data: "test" });
    }

    catch (error) {
        console.error('Error creating CAPA:', error);
         if (error.code === 'EREQUEST' &&error.originalError?.info?.number) {

           return NextResponse.json(
            { success: false, error: error.originalError?.info.message },
            { status: 500 }
        );


    }
}
}






export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

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

const results = await executeQueryWithMultipleResults('sp_GetCAPAList', {
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

