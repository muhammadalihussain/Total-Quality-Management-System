"use client";
import { PDFViewer, COADocument } from '@/components/coapdf';
import { ResumeActions } from '@/components/coapdf/resume-actions';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


export default  function COAPage() {
   const params = useParams();
   const [Id, setId] = useState<any>(params.id);
   const [rowData, setRowData] = useState<any[]>([]);
   const [rowCompanyInfo, setRowCompanyInfo] = useState<any>([]);
   const [rowCOAInfo, setCOAInfo] = useState<any>([]);

 useEffect(() => {

  const generatePDF = async (Id :any) => {
     try {
 
      const res = await fetch(`/api/qa/generate-coa-pdf/${Id}`);
      const result = await res.json();
      const  testResults= result.data; // array of test objects
   
  
      setRowData(testResults[0])
      setRowCompanyInfo(testResults[1])
      setCOAInfo(testResults[2])
    
 
     } catch (err) {
       console.log(err);
     } finally {
     
     }
   };
generatePDF(Id);
 }, []);
  
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='flex items-center justify-between border-b px-4 py-2'>
        <span className='text-muted-foreground text-sm'>
          CERTIFICATE OF ANALYSIS
        </span>
        <ResumeActions  data={rowData} companyInfo={rowCompanyInfo[0]} COAInfo={rowCOAInfo[0]}  />
      </div>
      <PDFViewer className='w-full flex-1'>
        <COADocument data={rowData}  companyInfo={rowCompanyInfo[0]}  COAInfo={rowCOAInfo[0]} />
      </PDFViewer>
    </div>
  );
}
