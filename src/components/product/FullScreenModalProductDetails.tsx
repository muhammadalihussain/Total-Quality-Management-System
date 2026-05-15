"use client";

import React, { useEffect } from "react";
import { Modal } from "../ui/modal";

import ProductMetaCard from "@/components/product/ProductMetaCard";
import ProductCertificationsCard from "@/components/product/ProductCertificationsCard";
import ProductPackagingCard from "@/components/product/ProductPackagingCard";
import ProductChemicalParametersCard from "@/components/product/ProductChemicalParametersCard";

import {
  Package2,
  ShieldCheck,
  Boxes,
  FlaskConical,
  X,
} from "lucide-react";

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
      showCloseButton={false}
    >
      <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100">
        {/* HEADER */}
        <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl shadow-sm">
          <div className="flex items-center justify-between px-6 py-5 lg:px-10">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                <Package2 className="h-7 w-7 text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                  Product Details
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Complete product information and specifications
                </p>
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="h-[calc(100vh-88px)] overflow-y-auto px-5 py-6 lg:px-10 lg:py-8">
          {/* TOP INFO CARDS */}
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {/* PRODUCT */}
            <div className="rounded-3xl border border-white/50 bg-white/90 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
                  <Package2 className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Product
                  </p>

                  <h3 className="text-lg font-bold text-gray-800">
                    Master Data
                  </h3>
                </div>
              </div>
            </div>

            {/* CERTIFICATION */}
            <div className="rounded-3xl border border-white/50 bg-white/90 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-green-100 p-4 text-green-600">
                  <ShieldCheck className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Compliance
                  </p>

                  <h3 className="text-lg font-bold text-gray-800">
                    Certifications
                  </h3>
                </div>
              </div>
            </div>

            {/* PACKAGING */}
            <div className="rounded-3xl border border-white/50 bg-white/90 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-orange-100 p-4 text-orange-600">
                  <Boxes className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Packaging
                  </p>

                  <h3 className="text-lg font-bold text-gray-800">
                    Storage Details
                  </h3>
                </div>
              </div>
            </div>

            {/* CHEMICAL */}
            <div className="rounded-3xl border border-white/50 bg-white/90 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-purple-100 p-4 text-purple-600">
                  <FlaskConical className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Quality
                  </p>

                  <h3 className="text-lg font-bold text-gray-800">
                    Chemical Parameters
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT CARDS */}
          <div className="space-y-8">
            {/* PRODUCT META */}
            <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-xl backdrop-blur-sm">
              <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
                    <Package2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Product Information
                    </h2>

                    <p className="text-sm text-gray-500">
                      Product master details and information
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <ProductMetaCard id={Id} />
              </div>
            </section>

            {/* CERTIFICATIONS */}
            <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-xl backdrop-blur-sm">
              <div className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-green-100 p-2 text-green-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Certifications
                    </h2>

                    <p className="text-sm text-gray-500">
                      Product approvals and certifications
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <ProductCertificationsCard id={Id} />
              </div>
            </section>

            {/* PACKAGING */}
            <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-xl backdrop-blur-sm">
              <div className="border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-100 p-2 text-orange-600">
                    <Boxes className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Packaging Details
                    </h2>

                    <p className="text-sm text-gray-500">
                      Packaging and storage specifications
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <ProductPackagingCard id={Id} />
              </div>
            </section>

            {/* CHEMICAL PARAMETERS */}
            <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-xl backdrop-blur-sm">
              <div className="border-b border-gray-100 bg-gradient-to-r from-purple-50 to-fuchsia-50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-purple-100 p-2 text-purple-600">
                    <FlaskConical className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Chemical Parameters
                    </h2>

                    <p className="text-sm text-gray-500">
                      Quality control and chemical specifications
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <ProductChemicalParametersCard id={Id} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FullScreenModalProductDetails;