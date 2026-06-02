import { NextResponse,NextRequest } from "next/server";
import { executeQuery, executeQueryWithMultipleResults ,executeStoredProcedure ,executeNonQuery} from '@/lib/dal/dbutils';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
 
 try {
  const { id } = await context.params; // 🔥 IMPORTANT
 
    if (!id) {
    return NextResponse.json(
      { success: false, message: "ID is missing" },
      { status: 400 }
    );
  }

          const results = await executeQueryWithMultipleResults('sp_GetALLITEMVARIETYID', {
            DATAAREAID : (id)
          });


         
          return NextResponse.json({ success: true, data: results });
        

  } catch (error:any) {

    return NextResponse.json(
      {
        success: false,
        message: error.message || "failed",
      },
      { status: 500 }
    );
  }

}



