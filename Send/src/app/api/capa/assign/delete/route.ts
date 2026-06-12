import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure} from '@/lib/dal/dbutils';
import sql from "mssql";
import nodemailer from 'nodemailer';


export async function POST(req: Request) {
  try {
    const { CAPAID ,AssignmentID } = await req.json();

     const result = await executeQuery("sp_DeleteAssignCAPAUser", {
   CAPAID: { type: sql.Int, value: parseInt(CAPAID) },
   AssignmentID: { type: sql.Int, value: parseInt(AssignmentID) },
    });


  




const emailBody = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

    <p>Dear,</p>

    <p>
      Kindly ignore my previous email. The record mentioned below was sent by mistake.
    </p>

    <p style="padding: 10px; background: #f5f5f5; border-left: 4px solid #e74c3c;">
      <b>CAPA ID:</b> ${result?.[0]?.CAPAID}
    </p>

    <p>
      We apologize for any inconvenience caused.
    </p>

    <br/>

    <p>Regards,</p>

  </div>
`;
        // CONFIGURE THESE VALUES:
const SMTP_CONFIG = {
  host: "192.168.11.17",  //192.168.11.17 //mail.matcofoods.com
  port: 2500,
  username: 'mfl.cms@matcofoods.com.pk',  // ← CHANGE THIS
  password: 'm@tco123',  // ← CHANGE THIS
  from: "mfl.cms@matcofoods.com.pk",      // ← CHANGE THIS
  to: result[0].Email     // ← CHANGE THIS
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
      html: emailBody
    });
    //console.log('✅ Success! Email sent:', result.messageId);
  } catch (error :any) {
    console.error('❌ Failed:', error);
  }





    return Response.json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (err: any) {
    return Response.json(
      {
        success: false,
        message: err.message
      },
      { status: 400 }
    );
  }
}