
import { NextResponse, NextRequest } from "next/server";
import { pool } from '@/lib/db';
import { comparePassword } from '@/utils/hash'; // or relative path
 import { signToken } from '@/lib/jwt';



export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // Get query param
  const db = await pool(); // Singleton pool


  try {
    if (type === "company") {

     const result = await db.request()
      .execute('sp_GetAllSites');
     const sites = result.recordset;
    if (!sites) return NextResponse.json({ message: "Sites not found" }, { status: 404 });
      return NextResponse.json({ result });
    }

    else if (type === "roles") {
     const result = await db.request()
      .execute('sp_GetAllRoles');
     const roles = result.recordset;
    if (!roles) return NextResponse.json({ message: "Roles not found" }, { status: 404 });
      return NextResponse.json({ result });
    }
    
    else {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Failed to fetch production data" },
      { status: 500 }
    );
  }
}

// export const POST = async (request: NextRequest) => {
//   try {
//     const { id, type, compnayId, siteId } = await request.json();
//     if (type === "sites") {
//       const result = await data.GetAllInventSite(id);
//       return NextResponse.json({ result });
//     } else if (type === "wahrehouse") {
//       const result = await data.GetProductionLineBySite(compnayId, siteId);
//       return NextResponse.json({ result });
//     } else if (type === "fetchUser") {
//       const result = await data.UserfindById(id);
//       return NextResponse.json({ result });
//     }

//     if (type === "getsitesbyuserid") {
//       const result = await data.GetSitesByUserId(id);

//       return NextResponse.json({ result });
//     } else {
//       return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//     }
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message },
//       {
//         status: 500,
//       }
//     );
//   }
// };
