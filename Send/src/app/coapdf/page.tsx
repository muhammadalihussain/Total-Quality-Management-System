import { resume } from '@/lib/constants';
import { PDFViewer, ResumeDocument } from '@/components/coapdf';
import { ResumeActions } from '@/components/coapdf/resume-actions';

export default async function ResumePage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='flex items-center justify-between border-b px-4 py-2'>
        <span className='text-muted-foreground text-sm'>
          CERTIFICATE OF ANALYSIS
        </span>
        <ResumeActions />
      </div>
      <PDFViewer className='w-full flex-1'>
        <ResumeDocument resume={resume} />
      </PDFViewer>
    </div>
  );
}
