import { Suspense } from "react";
import QA from '@/components/qa/QA';


export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QA />
    </Suspense>
  );
}