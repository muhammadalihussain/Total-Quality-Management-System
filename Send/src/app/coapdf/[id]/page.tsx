import { Suspense } from "react";
import COAPage from '@/components/coapdf/pdfcomponent';


export default function COAPagePdf() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <COAPage />
    </Suspense>
  );
}