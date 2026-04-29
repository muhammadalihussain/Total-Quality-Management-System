import { NextResponse } from "next/server";
import {  executeQueryWithMultipleResults } from '@/lib/dal/dbutils';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const salesId = searchParams.get("salesId");
  const dataAreaid  = searchParams.get("dataAreaid");

   const results = await executeQueryWithMultipleResults(
    'sp_GetDetailsBySalesId',
    {
            SalesId: salesId ? salesId: null,
            DataAreaid: dataAreaid
    }
  )

     /*   console.log(result[0] )
        console.log(result[1] )
      console.log(results.recordsets[0][0])
      console.log(SalesId.results.recordsets[1])  */

  return NextResponse.json({
    customer: results[0] || null,
    items: results[1] || []
  });
}

