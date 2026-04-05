"use client";

import React, { useEffect } from "react";
import { Modal } from "../ui/modal";
import ProductMetaCard from "@/components/product/ProductMetaCard";
import ProductCertificationsCard from "@/components/product/ProductCertificationsCard";
import ProductPackagingCard from "@/components/product/ProductPackagingCard";
import ProductChemicalParametersCard from "@/components/product/ProductChemicalParametersCard";

interface Props {
  isOpen: boolean;
  Id: string | number | null;
  onClose: () => void;
}

const FullScreenModalProductDetails: React.FC<Props> = ({
  isOpen,
  onClose,
  Id,
}) => {
  useEffect(() => {
    if (!Id) return;
  }, [Id]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isFullscreen={true}
      showCloseButton
    >
      <div className="p-6 lg:p-10 overflow-y-auto h-screen bg-white dark:bg-gray-900">

        <h2 className="text-lg font-semibold mb-6">
          Product Details
        </h2>

        <div className="space-y-6">
          <ProductMetaCard id={Id} />
          <ProductCertificationsCard id={Id} />
          <ProductPackagingCard id={Id} />
          <ProductChemicalParametersCard id={Id} />
        </div>

      </div>
    </Modal>
  );
};

export default FullScreenModalProductDetails;