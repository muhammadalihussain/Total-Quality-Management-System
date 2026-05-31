"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";

import ProductMetaCard from "@/components/qa/ProductMetaCard";
import ProductChemicalParametersCard from "@/components/qa/ProductChemicalParametersCard";

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
  const [active, setActive] = useState<
    "product" | "chem"
  >("product");

  useEffect(() => {
    if (!Id) return;
    setActive("product");
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

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                <Package2 className="h-7 w-7 text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                 CERTIFICATE OF ANALYSIS

                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Complete QA information 
                </p>
              </div>

                 {/* TOP BEAUTIFUL BOXES */}
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

            {/* PRODUCT */}
            <div
              onClick={() => setActive("product")}
              className={`group cursor-pointer rounded-3xl p-5 transition-all duration-300 ${
                active === "product"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl scale-[1.03]"
                  : "bg-white hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-2xl p-3 transition ${
                    active === "product"
                      ? "bg-white/20"
                      : "bg-blue-100 text-blue-600 group-hover:scale-110"
                  }`}
                >
                  <Package2 className="h-6 w-6" />
                </div>
                <div>
                  <p className={`text-xs ${
                    active === "product" ? "text-white/80" : "text-gray-500"
                  }`}>
                    QA
                  </p>
                  <h3 className="text-lg font-bold">Master Data</h3>
                </div>
              </div>
            </div>


            {/* CHEMICAL */}
            <div
              onClick={() => setActive("chem")}
              className={`group cursor-pointer rounded-3xl p-5 transition-all duration-300 ${
                active === "chem"
                  ? "bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow-xl scale-[1.03]"
                  : "bg-white hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-2xl p-3 transition ${
                    active === "chem"
                      ? "bg-white/20"
                      : "bg-purple-100 text-purple-600 group-hover:scale-110"
                  }`}
                >
                  <FlaskConical className="h-6 w-6" />
                </div>
                <div>
                  <p className={`text-xs ${
                    active === "chem" ? "text-white/80" : "text-gray-500"
                  }`}>
                    Quality
                  </p>
                  <h3 className="text-lg font-bold">Chemical</h3>
                </div>
              </div>
            </div>

          </div>

            </div>

            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:scale-105 hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>

          </div>
        </div>

        {/* BODY */}
        <div className="h-[calc(100vh-88px)] overflow-y-auto px-6 py-6">

       
          {/* CONTENT SECTION */}
          <div className="rounded-3xl bg-white shadow-xl p-6">

            {active === "product" && (
              <ProductMetaCard id={Id} />
            )}

          

            {active === "chem" && (
              <ProductChemicalParametersCard id={Id} />
            )}

          </div>

        </div>
      </div>
    </Modal>
  );
};

export default FullScreenModalProductDetails;