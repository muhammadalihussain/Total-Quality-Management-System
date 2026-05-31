'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ComponentCard from "../common/ComponentCard";
import { Modal } from "../ui/modal";
import { useModal } from "@/hooks/useModal";

export default function ViewDetails({ isOpen, onClose, capaID  }: any) {

  // =====================
  // ✅ STATE (ALL HOOKS FIRST)
  // =====================


   const [message, setMessage] = useState('');
   const [userId, setUserId] = useState<string | null>(null);
   const [editing, setEditing] = useState<any | null>(null);
   const [details, setDetails] = useState<any>(null);
   const [loading, setLoading] = useState(true);


  const fetchDetails = async (capaID :any) => {
    try {


      setLoading(true);

      const res = await fetch(`/api/capa?id=${capaID}`);
      const result = await res.json();

      if (result.success) {
        setDetails({ capa: result.data?.[0]?.[0] });
      }


    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  if (capaID) {
    fetchDetails(capaID);
  }
}, [capaID]);


  // =====================
  // UI
  // =====================

    if (!isOpen) return null;


  return (

    <ComponentCard title="Create CAPA">

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="max-w-[900px] p-5 lg:p-10"
      >


        {/* CAPA CARD */}
        <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b">

            <div className="flex flex-col xl:flex-row justify-between gap-6">

              {/* LEFT */}
              <div className="space-y-4">



                <h2 className="text-xl font-semibold text-gray-800">
                  {details?.capa.Title}
                </h2>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border">
                    <p className="text-gray-500 text-sm">Customer</p>
                    <p className="font-semibold">{details?.capa.Customer}</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border">
                    <p className="text-gray-500 text-sm">Item</p>
                    <p className="font-semibold">{details?.capa.ItemName}</p>
                      <p className="font-semibold">{details?.capa.ItemId}</p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border">
                    <p className="text-gray-500 text-sm">SOP#</p>
                    <p className="font-semibold">{details?.capa.SalesId}</p>
                  </div>
                </div>
      <div className="bg-white p-4 rounded-xl border">
     <p className="text-gray-500 text-sm">
                    Complaint Detail
                  </p>

                  <p className="font-semibold">
                    {details?.capa.Description}
                  </p>
             </div>
              </div>

              {/* RIGHT */}
              <div className="w-full xl:w-80 bg-white p-6 rounded-2xl border shadow-sm">

                <p className="text-gray-500 text-sm">Created By</p>
                <p className="font-semibold mb-4">{details?.capa.CreatedByName}</p>

                <p className="text-gray-500 text-sm">Department</p>
                <p className="font-semibold mb-4">{details?.capa.DepartmentName}</p>

                <p className="text-gray-500 text-sm">Status</p>
                <span className="inline-block mt-1 px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold">
               {details?.capa.Status}
                </span>

              </div>
            </div>

          </div>
        </div>
      </Modal>
    </ComponentCard>
  );
}