import React from "react";
import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import COAPdf from "@/components/qa/COAPDF";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {

  const coaData = {
    coaNo: params.id,
    product: "Organic Rice Syrup Brown DE-28",
    productNumber: "MFOBRS28",
    lotNumber: "MFRS21A26A-2",
    productionDate: "21-Jan-2026",
    expiryDate: "21-Jul-2027",
    preparedBy: "Manager QA/QC",
    approvedBy: "Head QA/QC",
    analysis: [],
  };

  const pdfStream = await renderToStream(
    React.createElement(COAPdf, { data: coaData })
  );

  return new NextResponse(pdfStream as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=COA-${params.id}.pdf`,
    },
  });
}