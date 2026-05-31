'use client';

import { Download } from 'lucide-react';

import { resume } from '@/lib/constants';

import { PDFDownloadLink, COADocument } from '.';

interface ResumeActionsProps {
  data: any;
  companyInfo:any
  COAInfo:any
}

export function ResumeActions({ data,companyInfo ,COAInfo}: ResumeActionsProps) {
  return (
    <div className='flex gap-4'>
      <PDFDownloadLink
        document={<COADocument   data={data}  companyInfo={companyInfo}  COAInfo={COAInfo}
 />}
        fileName='coa.pdf'
        className='flex-1 sm:flex-none'
      >
        {({ loading }) => (
          <button
           
            disabled={loading}
            className='w-full sm:w-auto'
          >
            <Download />
            {loading ? 'Loading...' : 'Download'}
          </button>
        )}
      </PDFDownloadLink>
    
    </div>
  );
}
