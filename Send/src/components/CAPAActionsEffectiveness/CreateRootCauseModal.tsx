'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ComponentCard from "../common/ComponentCard";
import { Modal } from "../ui/modal";
import { useModal } from "@/hooks/useModal";

export default function CreateRootCauseModal({ isOpen, onClose, onSuccess ,editingData , capaID ,setrefreshGrid ,view }: any) {

  // =====================
  // ✅ STATE (ALL HOOKS FIRST)
  // =====================


   const [message, setMessage] = useState('');
   const [userId, setUserId] = useState<string | null>(null);
   const [editing, setEditing] = useState<any | null>(null);



type FormType = {
  RootCauseID: string;
  DetailsOfRootCause: string;
  CorectiveAction: string;
  PreventiveAction: string;
  CreatedBy: string | null;
  CAPAID: string | null;

};


const initialForm: FormType = {
  ActionID:'',
  RootCauseID: '',
  DetailsOfRootCause: '',
  CorectiveAction: '',
  PreventiveAction: '',
  CreatedBy:userId,
  CAPAID: capaID,

};



const [form, setFormData] = useState<FormType>(initialForm);
const fetchUpdate = async (payload :any) => {
  try {


    setFormData(payload);
    setMessage('');

     } catch (error) {
    console.error(error);
  }
  };



  useEffect(() => {
    const UserID = localStorage.getItem('UserID');

     setUserId(UserID);
    if (editingData!=null) {

    fetchUpdate(editingData);
    }

 else
  {
     setFormData(initialForm);

    }


  }, [capaID,editingData?.ActionID]);



    type FormError = {
       RootCauseID?: boolean;
      DetailsOfRootCause?: boolean;
      CorectiveAction?: boolean;
      PreventiveAction?: boolean;
      DetailsOfRootCause?:boolean;

      }


  const [error, setError] = useState<FormError>({});
  const [loading, setLoading] = useState(false);

  const [rootCauseType, setRootCauseTypes] = useState([]);

    useEffect(() => {

     const fetchData = async () => {

        try {
           const res2 = await axios.get(`/api/dynamics?type=RootCauseType`);
               setRootCauseTypes( res2.data.result.recordset);

} catch (error: any) {
  console.log("ERROR:", error.response?.data || error.message);
}
     }
    fetchData();
  }, []);





  if (!isOpen) return null;



    const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...form, [name]: value });

    }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

     const newError: FormError = {}; // type-safe

      if (!form.RootCauseID) newError.RootCauseID = true;
      if (!form.DetailsOfRootCause.trim()) newError.DetailsOfRootCause = true;
       if (!form.CorectiveAction.trim()) newError.CorectiveAction = true;
       if (!form.PreventiveAction.trim()) newError.PreventiveAction = true;

      setError(newError);
      if (Object.keys(newError).length > 0)
       {
       setLoading(false);
       return; // stop if error
       }


       if(editingData!=null)
       {

       try {
      const response = await fetch('/api/capaeffectiveness', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        ActionID:editingData.ActionID,
         RootCauseID: form.RootCauseID,
  DetailsOfRootCause:form.DetailsOfRootCause ,
  CorectiveAction: form.CorectiveAction,
  PreventiveAction: form.PreventiveAction,
  CreatedBy:userId,
  CAPAID: capaID,

        })
      });
setrefreshGrid(true);
      if (!response.ok)
      {

         setMessage("Request failed");
      
  return;
}

     setEditing(null);
     toast.success("CAPA Created Successfully");
      onSuccess();

    } catch (error) {
      toast.error('Failed to create CAPA');
      console.error(error);
    } finally {
      setLoading(false);
    }
}

else

    try {
      const response = await fetch('/api/capaeffectiveness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
  RootCauseID: form.RootCauseID,
  DetailsOfRootCause:form.DetailsOfRootCause ,
  CorectiveAction: form.CorectiveAction,
  PreventiveAction: form.PreventiveAction,
  CreatedBy:userId,
  CAPAID: capaID,

         })
      });

        if (typeof setRefreshGrid === "function") {
         setRefreshGrid(true);
      
        }

      if (!response.ok)
      {

      setMessage ("Error occurred")
  return;
}

setEditing(null);
toast.success("CAPA Created Successfully");
 onSuccess();

    } catch (error) {
      toast.error('Failed to create CAPA');
      console.error(error);
    } finally {
      setLoading(false);
    }




  };

  // =====================
  // UI
  // =====================
  return (
    <ComponentCard title="Create CAPA">

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="max-w-[900px] p-5 lg:p-10"
      >

      {message && (
  <p className="text-lg font-semibold text-red-600">
    {message}
  </p>
)}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* SALES ID */}
            <div>


             <label className="block text-sm font-medium mb-1">
               Root Cause Type
              </label>

              <select

                     disabled={view}
                value={form.RootCauseID}

                onChange={(e) => {
                  const id = e.target.value;
                  setFormData({ ...form, RootCauseID: id });
                }}
              className={`w-full border rounded px-3 py-2 ${
  error?.RootCauseID ? "border-red-500" : "border-gray-300"
}`}

                 aria-label="ItemId"
              >
                <option value="">Select Root Cause Type</option>

                {rootCauseType.map((item, index) => (
                  <option key={index} value={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </select>



            </div>

            {/* CUSTOMER */}
            <div>
              <label className="block text-sm font-medium mb-1">
                CAPAID
              </label>

              <input
                type="text"
                disabled

                value={capaID || ''}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* ITEM */}
            <div>


                  <label className="block text-sm font-medium mb-1">
               Corrective Action
              </label>

                  <textarea
disabled={view}
              name="CorectiveAction"
              value={form.CorectiveAction}
              onChange={handleChange}
              rows={3}


className={`w-full border rounded px-3 py-2 ${
  error?.CorectiveAction ? "border-red-500" : "border-gray-300"
}`}


            />

            </div>

            {/* ITEM NAME */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Preventive Action
              </label>

               <textarea
disabled={view}
              name="PreventiveAction"
              value={form.PreventiveAction}
              onChange={handleChange}
              rows={3}


className={`w-full border rounded px-3 py-2 ${
  error?.PreventiveAction ? "border-red-500" : "border-gray-300"
}`}


            />
            </div>




          </div>

          {/* ROW 3 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Enter Details Of Root Cause
            </label>

            <textarea
disabled={view}
              name="DetailsOfRootCause"
              value={form.DetailsOfRootCause}
              onChange={handleChange}
              rows={3}


className={`w-full border rounded px-3 py-2 ${
  error?.DetailsOfRootCause ? "border-red-500" : "border-gray-300"
}`}


            />
          </div>
{ !view && (
          <div className="flex gap-3 pt-4">

            <button 

            disabled={view}
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button

            
              type="submit"
              disabled={loading || view }
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded"
            >


                {loading ? "Creating..." :  editingData ? ("Update CAPA") : "Create CAPA"}
            </button>

          </div>)
             }
        </form>
      </Modal>
    </ComponentCard>
  );
}