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

export default function RootCauseDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [details, setDetails] = useState<any>(null);
  const [capas, setCapas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { isOpen, openModal, closeModal } = useModal();
  const [editing, setEditing] = useState<any | null>(null);
  const [refreshGrid, setrefreshGrid] = useState(false);
   const [view, setView] = useState(false);

  // ================= FETCH =================
  const fetchDetails = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/capa?id=${params.id}`);
      const result = await res.json();

      if (result.success) {
        setDetails({ capa: result.data?.[0]?.[0] });
      }

      const res1 = await fetch(`/api/capaeffectiveness?CAPAID=${params.id}`);
      const data = await res1.json();

      setCapas(data.data || []);
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
  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  const updateRow = (row: any) => {
    setEditing(row);
    openModal();
  };

  const deleteRow = async (id: number) => {
    await fetch(`/api/capaeffectiveness/${id}`, { method: "DELETE" });
    fetchDetails();
    setrefreshGrid(!refreshGrid);
  };

  const columns: ColDef[] = [
    { field: 'Name', headerName: 'Root Cause Type', width: 200 },
    { field: 'DetailsOfRootCause', headerName: 'Root Cause Details', width: 220 },
    { field: 'CorectiveAction', headerName: 'Corrective Action', width: 200 },
    { field: 'PreventiveAction', headerName: 'Preventive Action', width: 200 },
    { field: 'FullName', headerName: 'Created By', width: 140 },

    {
      headerName: "Actions",
      pinned: "right",
      width: 140,
      cellRenderer: (params: any) => (
        <div className="flex gap-2">

          {/* VIEW */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 text-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              setView(true);
                updateRow(params.data);
            }}
          >
            👁
          </button>

          {/* EDIT */}
          <button
            disabled={params.data.ActionTaken != 0}
            onClick={(e) => {
              e.stopPropagation();
              setView(false)
              updateRow(params.data);
            }}
            className={`p-2 rounded-lg ${
              params.data.ActionTaken != 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-gray-100"
            }`}
          >
            ✏️
          </button>

          {/* DELETE */}
          <button
            disabled={params.data.ActionTaken != 0}
            onClick={(e) => {
              e.stopPropagation();
              deleteRow(params.data.ActionID);
            }}
            className={`p-2 rounded-lg ${
              params.data.ActionTaken != 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-600 hover:bg-gray-100"
            }`}
          >
            🗑
          </button>

        </div>
      ),
    },
  ];

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100">
        <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading CAPA Details...
          </p>
        </div>
      </div>
    );
  }

  if (!details?.capa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-800">
            CAPA Not Found
          </h2>
          <p className="text-gray-500 mt-2 mb-6">
            The requested record does not exist.
          </p>

          <Button
            onClick={() => router.push("/rootcause")}
            className="rounded-xl px-6"
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6">

      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER BAR */}
        <div className="flex justify-between items-center">
          
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back
          </button>
{ details.capa.StatusId!=5?(
          <Button
            onClick={() => {
              openModal();
              setView(false)
              setEditing(null);
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow"
          >
            + Add Root Cause
          </Button>):""
          }
        </div>

        {/* CAPA CARD */}
        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">

            <div className="flex flex-col xl:flex-row justify-between gap-6">

              {/* LEFT */}
              <div className="space-y-4">



                <h2 className="text-xl font-semibold text-gray-800">
                  {details.capa.Title}
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border">
                    <p className="text-gray-500 text-sm">Customer</p>
                    <p className="font-semibold">{details.capa.Customer}</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border">
                    <p className="text-gray-500 text-sm">Item</p>
                    <p className="font-semibold">{details.capa.ItemName}</p>
                     <p className="font-semibold">{details.capa.ItemId}</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border">
                    <p className="text-gray-500 text-sm">SOP#</p>
                    <p className="font-semibold">{details.capa.SalesId}</p>
                  </div>
                </div>
      <div className="bg-white p-4 rounded-xl border">
     <p className="text-gray-500 text-sm">
                    Complaint Detail
                  </p>

                  <p className="font-semibold">
                    {details.capa.Description}
                  </p>
             </div>
              </div>

              {/* RIGHT */}
              <div className="w-full xl:w-80 bg-white p-6 rounded-2xl border shadow-sm">

                <p className="text-gray-500 text-sm">Created By</p>
                <p className="font-semibold mb-4">{details.capa.CreatedByName}</p>

                <p className="text-gray-500 text-sm">Department</p>
                <p className="font-semibold mb-4">{details.capa.DepartmentName}</p>

                <p className="text-gray-500 text-sm">Status</p>
                <span className="inline-block mt-1 px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold">
               {details.capa.Status}
                </span>

              </div>
            </div>

          </div>
        </div>

        {/* GRID */}
        <div className="bg-white rounded-3xl shadow border p-3">

          <AgGridTable
            onGridReady={onGridReady}
            columns={columns}
            data={capas}
            height="600px"
            pagination={true}
          />

        </div>

      </div>

      {/* MODAL */}
      <CreateRootCauseModal
        isOpen={isOpen}
        onClose={closeModal}
        editingData={editing}
        capaID={params.id}
        setrefreshGrid={setrefreshGrid}
        view={view}
        onSuccess={() => {
          closeModal();
          fetchDetails();
          toast.success("Saved successfully!");
        }}
      />



    </div>
  );
}