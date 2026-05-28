import { Suspense } from "react";
import Product from '@/components/product/Product';


export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Product />
    </Suspense>
  );
}