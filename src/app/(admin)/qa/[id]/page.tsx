'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { AgGridTable } from '@/components/ui/AgGridTable/AgGridTable';
import { ColDef } from 'ag-grid-community';
import CreateRootCauseModal from '@/components/CAPAActionsEffectiveness/CreateRootCauseModal';
import { useModal } from "@/hooks/useModal";
import toast from 'react-hot-toast';
import axios from "axios";
import flatpickr from 'flatpickr';

export default function QAPage() {
  const params = useParams();
  const router = useRouter();

  const [details, setDetails] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const { isOpen, openModal, closeModal } = useModal();
  const [editing, setEditing] = useState<any | null>(null);
  const [refreshGrid, setrefreshGrid] = useState(false);
   const [view, setView] = useState(false);

  // ================= FETCH =================
  const fetchDetails = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/qa?id=${params.id}`);
      const result = await res.json();

      if (result.success) {
        setDetails({ coa: result.data?.[0]?.[0] });
      }


    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.id, refreshGrid]);

  // ================= GRID =================


  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading COA Details...
          </p>
        </div>
      </div>
    );
  }

  if (!details?.coa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-800">
            QA Not Found
          </h2>
          <p className="text-gray-500 mt-2 mb-6">
            The requested record does not exist.
          </p>


        </div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6">


        {/* CAPA CARD */}
        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">

            <div className="flex flex-col xl:flex-row justify-between gap-6">

              {/* LEFT */}
              <div className="space-y-4">

<a href='#'  onClick={() => router.back()}>
                        ← Back
                    </a>

                <h2 className="text-xl font-semibold text-gray-800">
                  {details.coa.ACCOUNTNUM}

                </h2>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-white  p-4 rounded-xl border">
                     <div className="flex gap-2">
                    <p className="text-gray-500 text-sm">SOP # :</p>
                    <p className="font-semibold">{details.coa.SalesId}</p>
                    </div>


                      <div className="flex gap-2">
                    <p className="text-gray-500 text-sm">Production Date :</p>
                    <p className="font-semibold"> { new Date(details.coa.ProductionDate).toISOString().split('T')[0]  }</p>


                    </div>

                  <div className="flex gap-2">
                    <p className="text-gray-500 text-sm">Expiry Date :</p>
                    <p className="font-semibold"> { new Date(details.coa.ExpiryDate).toISOString().split('T')[0]  }</p>

                    </div>

                     <div className="flex gap-2">
                    <p className="text-gray-500 text-sm">LotNumber :</p>
                    <p className="font-semibold"> { details.coa.LotNumber }</p>

                    </div>

                    <div className="flex gap-2">
                    <p className="text-gray-500 text-sm">RFNItemNumber :</p>
                    <p className="font-semibold"> { details.coa.RFNItemNumber }</p>

                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border">


                     <p className="font-semibold">Item :  {details.coa.ItemId}</p>
                       <p className="font-semibold">ItemVarietyID:  ({details.coa.ItemVarietyID})</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border">
 <div className="flex gap-3">
                    <p className="text-gray-500 text-sm">PreparedAt:</p>
                   <p className="font-semibold"> { new Date(details.coa.PreparedAt).toISOString().split('T')[0]  }</p>
                    </div>

                     <div className="flex gap-3">
                    <p className="text-gray-500 text-sm">CheckedAt:</p>
                   <p className="font-semibold">

                    {details.coa.CheckedAt
                      ? new Date(details.coa.CheckedAt).toLocaleDateString()
                      : '-'}

                  </p>
                    </div>

                     <div className="flex gap-3">
                    <p className="text-gray-500 text-sm">ApprovedAt:</p>
                   <p className="font-semibold">

                   {details.coa.ApprovedAt
                      ? new Date(details.coa.ApprovedAt).toLocaleDateString()
                      : '-'}

                 </p>
                    </div>



                  </div>

                </div>
               <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">ItemName</p>
                  <p className="font-semibold">{ details.coa.ItemName|| '-'}</p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="w-full xl:w-80 bg-white p-6 rounded-2xl border shadow-sm">

                <p className="text-gray-500 text-sm">Created By</p>
                <p className="font-semibold mb-4">{details.coa.CreatedByName}</p>

                <p className="text-gray-500 text-sm">Checked By</p>
                <p className="font-semibold mb-4">{details.coa.CheckedBy}</p>

                 <p className="text-gray-500 text-sm">Approved By</p>
                <p className="font-semibold mb-4">{details.coa.ApprovedBy}</p>

                <p className="text-gray-500 text-sm">Status</p>
                <span className="inline-block mt-1 px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold">
               {details.coa.StatusName}
                </span>

              </div>
            </div>

          </div>
        </div>


    </div>
  );
}