'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ComponentCard from "../common/ComponentCard";
import { Modal } from "../ui/modal";
import { useModal } from "@/hooks/useModal";

export default function AllRootCauseDetails({ isOpen, onClose ,editingData , capaID ,setrefreshGrid ,view }: any) {

  // =====================
  // ✅ STATE (ALL HOOKS FIRST)
  // =====================


   const [message, setMessage] = useState('');
   const [userId, setUserId] = useState<string | null>(null);
   const [editing, setEditing] = useState<any | null>(null);



type FormType = {
  ActionID: string;
  RootCauseID: string;
  DetailsOfRootCause: string;
  CorectiveAction: string;
  PreventiveAction: string;
  CreatedBy: string | null;
  CAPAID: string | null;
  ActionTaken:number;
  IsEffective:number;
  Remarks :string ;
};


const initialForm: FormType = {
  ActionID:'',
  RootCauseID: '',
  DetailsOfRootCause: '',
  CorectiveAction: '',
  PreventiveAction: '',
  CreatedBy:userId,
  CAPAID: capaID,
  ActionTaken:0,
  IsEffective:0,
  Remarks:''

};



const [form, setFormData] = useState<FormType>(initialForm);



useEffect(() => {


  const UserID = localStorage.getItem('UserID');
  setUserId(UserID);

 
}, []);



    type FormError = {
     
       ActionTaken?: boolean;
       IsEffective?: boolean;
       Remarks?:boolean;
      
      }


  const [error, setError] = useState<FormError>({});
  const [loading, setLoading] = useState(false);



  if (!isOpen) return null;

    const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...form, [name]: value });
    }

    
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

     const newError: FormError = {}; // type-safe

   

      setError(newError);
      if (Object.keys(newError).length > 0)
       {
       setLoading(false);
       return; // stop if error
       }


       if(editingData!=null)
       {

       try {
      const response = await fetch('/api/capaeffectiveness/AllCAPAActionsIsEffective', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        // ActionID:editingData.ActionID,
         ActionTaken: form.ActionTaken,
         IsEffective : form.IsEffective ,
  VerifiedBy :userId,
  CAPAID: capaID,
  Remarks:form.Remarks

        })
      });
    setrefreshGrid(new Date().toLocaleString());
    onClose()
      if (!response.ok)
      {

         setMessage("Request failed");
      
  return;
}

     setEditing(null);
  
     

    } catch (error) {
      toast.error('Failed to create CAPA');
      console.error(error);
    } finally {
      setLoading(false);
    }
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

       


                  <div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block mb-1">Action Taken</label>
    <select
      name="ActionTaken"
     onChange={handleChange}  value={form.ActionTaken }
      className={`w-full border rounded px-3 py-2  border-gray-300"
      }`}
    >
      <option value={1}>Yes</option>
      <option value={0}>No</option>
    </select>
  </div>

  <div>
    <label className="block mb-1">Is Effective</label>
    <select
      name="IsEffective"

       value={form.IsEffective }
       onChange={handleChange}
    
     className={`w-full border rounded px-3 py-2  border-gray-300"
      }`}
    >
      <option value={1}>Yes</option>
      <option value={0}>No</option>
    </select>
  </div>
</div>
         

         





          {/* ROW 3 */}
          <div>
          
  <label className="block text-sm font-medium mb-1">
          Enter Remarks
            </label>
              <textarea

              name="Remarks"
              value={form.Remarks ?? ''}
              
              onChange={handleChange}
              rows={3}


className={`w-full border rounded px-3 py-2 ${
  error?.Remarks ? "border-red-500" : "border-gray-300"
}`}


            />
          </div>

          <div className="flex gap-3 pt-4">

            <button 

          
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button

            
              type="submit"
         
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded"
            >


              Update CAPA
            </button>

          </div>
             
        </form>
      </Modal>
    </ComponentCard>
  );
}