import ProductChemicalParametersCard from "@/components/product/ProductChemicalParametersCard";
import ProductCertificationsCard from "@/components/product/ProductCertificationsCard";
import ProductPackagingCard from "@/components/product/ProductPackagingCard";
import ProductMetaCard from "@/components/product/ProductMetaCard";

//import FullScreenModal from "@/components/example/ModalExample/FullScreenModal";
//import ModalBasedAlerts from "@/components/example/ModalExample/ModalBasedAlerts";
//import VerticallyCenteredModal from "@/components/example/ModalExample/VerticallyCenteredModal";
//import FormInModal from "@/components/example/ModalExample/FormInModal";
//import DefaultModal from "@/components/example/ModalExample/DefaultModal";

import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumbCommon";

export const metadata: Metadata = {
  title: "Product details",
  description:
    "Product Detail information",
};

export default function ProductEditView() {

  return (
    <div>
     <PageBreadcrumb
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Details" }, // current page
        ]}
      />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Product Details
        </h3>
        <div className="space-y-6">
          {/* <ProductMetaCard />
          <ProductCertificationsCard />
          <ProductPackagingCard/>
          <ProductChemicalParametersCard /> */}

        </div>
      </div>
    </div>
  );
}
