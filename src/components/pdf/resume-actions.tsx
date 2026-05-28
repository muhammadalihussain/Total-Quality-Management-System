'use client';

import { Download } from 'lucide-react';

import { resume } from '@/lib/constants';

import { PDFDownloadLink, ResumeDocument, ATSResumeDocument } from '.';

export function ResumeActions() {
  return (
    <div className='flex gap-4'>
      <PDFDownloadLink
        document={<ResumeDocument resume={resume} />}
        fileName='kelvin-mai-resume.pdf'
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
      <PDFDownloadLink
        document={<ATSResumeDocument resume={resume} />}
        fileName='kelvin-mai-resume-ats.pdf'
        className='flex-1 sm:flex-none'
      >
        {({ loading }) => (
          <button
         
            disabled={loading}
            className='w-full sm:w-auto'
          >
            <Download />
            {loading ? 'Loading...' : 'ATS Version'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
