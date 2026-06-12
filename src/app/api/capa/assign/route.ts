import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure} from '@/lib/dal/dbutils';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { CAPAID, UserIDs,CreatedBy   } = body;

    const result = await executeQuery('sp_AssignCAPA_MultipleUsers', {
          CAPAID, UserIDs,CreatedBy
        });

     const host = req.headers.get("host");
     const protocol = req.headers.get("x-forwarded-proto") || "http";

 const baseUrl = `${protocol}://${host}`

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Corrective & Preventive</title>
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

            <h3 style="margin-top:0;color:#111827;">Corrective & Preventive Action </h3>

            <p style="color:#4b5563;font-size:14px;">
           Click Below link and then add root cause
            </p>

            <!-- TABLE DATA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:15px;">

              <tr>
                <td style="border:1px solid #ddd;padding:8px;width:150px;font-weight:bold;">CAPA No</td>
                <td style="border:1px solid #ddd;padding:8px;">${CAPAID}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Customer</td>
                <td style="border:1px solid #ddd;padding:8px;">${result[0]?.customer}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Sales Order</td>
                <td style="border:1px solid #ddd;padding:8px;">${result[0]?.SalesId}</td>
              </tr>

              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Product</td>
                <td style="border:1px solid #ddd;padding:8px;">${result[0]?.ItemName}</td>
              </tr>


              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:bold;">Complaints Details</td>
                <td style="border:1px solid #ddd;padding:8px;">${result[0]?.Description}</td>
              </tr>

            </table>

            <!-- BUTTON (OUTLOOK SAFE) -->
            <table cellpadding="0" cellspacing="0" style="margin-top:20px;">
              <tr>
             <td style="padding:10px 0;">
  <a href="${baseUrl}/rootcause/${CAPAID}"
     style="
       color:#3b82f6;
       text-decoration:underline;
       font-family:Arial;
       font-size:14px;
     ">
    Add Root Cause
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
      subject: 'kindly add root cause ',
      html: htmlTemplate
    });
    //console.log('✅ Success! Email sent:', result.messageId);
  } catch (error :any) {
    console.error('❌ Failed:', error);
  }



    return Response.json({ success: true });

  } catch (err: any) {
    return Response.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}