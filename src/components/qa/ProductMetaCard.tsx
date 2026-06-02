"use client";
import axios from 'axios';
import React, { AnyActionArg, useEffect, useState, } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";
import CreateCOAModal from '@/components/qa/CreateCOAModal';

const ProductMetaCard = ({  id }:any) => {

const { isOpen, openModal, closeModal } = useModal();

const [refreshGrid, setrefreshGrid] = useState(null);
const [details, setDetails] = useState<any>(null);
const [loading, setLoading] = useState(false);

  const fetchDetails = async (Id :any) => {
     try {
 
       setLoading(true);
 
       const res = await fetch(`/api/qa?id=${Id}`);
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
   if (id) {
     fetchDetails(id);
   }
 }, [id,refreshGrid]);
 



const handleOpen = async() => {

 openModal();
  };
 


  
if (!details) {
  return <div>Loading...</div>;
}


  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-4 xl:flex-row">
  <div className="order-3 xl:order-2">

            <div className="flex flex-col xl:flex-row justify-between gap-4">

              {/* LEFT */}
              <div className="space-y-4">


                <h2 className="text-xl font-semibold text-gray-800">
                  {details?.coa.ACCOUNTNUM}

                </h2>

                <div className="grid md:grid-cols-2 gap-2">
                  <div className="bg-white  p-4 rounded-xl border">
                     <div className="flex gap-2">
                    <p className="text-gray-500 text-sm">SOP # :</p>
                    <p className="font-semibold">{details?.coa.SalesId}</p>
                    </div>


                      <div className="flex gap-2">
                    <p className="text-gray-500 text-sm">Production Date :</p>
                    <p className="font-semibold"> 

                        {details?.coa.CheckedAt
                      ? new Date(details?.coa.ProductionDate).toLocaleDateString()
                      : '-'}
                      
                   </p>


                    </div>

                  <div className="flex gap-2">
                    <p className="text-gray-500 text-sm">Expiry Date :</p>
                    <p className="font-semibold"> 
                      
                        {details?.coa.CheckedAt
                      ? new Date(details?.coa.ExpiryDate).toLocaleDateString()
                      : '-'}
                      
                      </p>

                    </div>

                     <div className="flex gap-2">
                    <p className="text-gray-500 text-sm">LotNumber :</p>
                    <p className="font-semibold"> { details?.coa.LotNumber }</p>

                    </div>

                    <div className="flex gap-2">
                    <p className="text-gray-500 text-sm">RFNItemNumber :</p>
                    <p className="font-semibold"> { details?.coa.RFNItemNumber }</p>

                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border">


                     <p className="font-semibold">Item :  {details?.coa.ItemId}</p>
                       <p className="font-semibold">ItemVarietyID:  ({details?.coa.ItemVarietyID})</p>
                  </div>


                </div>
               <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">ItemName</p>
                  <p className="font-semibold">{ details?.coa.ItemName|| '-'}</p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="w-full xl:w-80 bg-white p-6 rounded-2xl border shadow-sm">

                <p className="text-gray-500 text-sm">Created By</p>
                <p className="font-semibold mb-4">{details?.coa.CreatedByName}
<br></br>

                     {details?.coa.PreparedAt
                      ? new Date(details?.coa.PreparedAt).toLocaleDateString()
                      : '-'}
                 

                </p>

                <p className="text-gray-500 text-sm">Checked By</p>
                <p className="font-semibold mb-4">{details?.coa.CheckedByName}

<br></br>
                   {details?.coa.CheckedAt
                      ? new Date(details?.coa.CheckedAt).toLocaleDateString()
                      : '-'}
                </p>

                 <p className="text-gray-500 text-sm">Approved By</p>
                <p className="font-semibold mb-4">{details?.coa.ApprovedByName}
<br></br>
  {details?.coa.ApprovedAt
                      ? new Date(details?.coa.ApprovedAt).toLocaleDateString()
                      : '-'}

                </p>

                <p className="text-gray-500 text-sm">Status</p>
                <span className="inline-block mt-1 px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold">
               {details?.coa.StatusName}
                </span>

              </div>
            </div>


  
   </div>
            </div>

              <CreateCOAModal
                   isOpen={isOpen}
                   onClose={closeModal}
                   editingData={details?.coa}
                   Id={id}
                   setrefreshGrid={setrefreshGrid}
                   onSuccess={() => {
                   closeModal();
                   
                  }}
                    />

          {details?.coa.ApprovedByName==null?(
         <button

         
            onClick={handleOpen }
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>) :""
}
        </div>
     </div>
       
    
    
    </>
  );
}

export default ProductMetaCard;
