'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ComponentCard from "../common/ComponentCard";
import { Modal } from "../ui/modal";
import { useModal } from "@/hooks/useModal";

export default function CreateCAPAModal({ isOpen, onClose, onSuccess ,editingData , capaID }: any) {

  // =====================
  // ✅ STATE (ALL HOOKS FIRST)
  // =====================
  const [customer, setCustomer] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [site, setSite] = useState<string | null>(null);
  const [message, setMessage] = useState('');
   const [userId, setUserId] = useState<string | null>(null);
   const [DepartmentId, setDepartmentId ]= useState<string | null>(null);
   const [selectedITEMVARIETYID, setSelectedITEMVARIETYID] = useState('');
   const [selectedItemVarityName, setSelectedItemVarityName] = useState('');
   const [editing, setEditing] = useState<any | null>(null);

  const [DataDepartmentrecords, setDataDepartmentRecords] = useState<any[]>([]);

type FormType = {
  SalesId: string;
  Site: string;
  ItemId: string;
  Description: string;
  CreatedBy: string | null;
  FromDepartmentID: string | null;
  ToDepartmentID: number[];
  ItemVarietyID: string;
  customer: any;
};


const initialForm: FormType = {
  SalesId: '',
  Site: '',
  ItemId: '',
  Description: '',
  CreatedBy: userId,
  FromDepartmentID: DepartmentId,
  ToDepartmentID: [], // ✅ FIXED (now typed)
  ItemVarietyID: selectedITEMVARIETYID,
  customer: ''
};


const value = initialForm?.ToDepartmentID;

const [selectedDepartments, setSelectedDepartments] = useState<number[]>(
  value ? String(value).split(",").map(Number) : []
);
const [form, setFormData] = useState<FormType>(initialForm);

  const fetchSales = async (initialForm :any) => {
    if (!initialForm.SalesId) {
     setFormData(initialForm);
     setCustomer('');
     setSelectedITEMVARIETYID('');
     setSelectedItemVarityName('');
     setSelectedItemName('');
     setSelectedDepartments([])

     setMessage("Enter sale order no.");
      return;
    }



    const res = await fetch(
  `/api/sales?salesId=${initialForm.SalesId}&dataAreaid=${site}`
);

    const data = await res.json();


     // ✅ CHECK DATA NOT FOUND
  if (!data || !data.customer?.length) {
    setMessage(`No data found  for this ${initialForm.SalesId} Sales Order`);
    return;
  }

    setCustomer(data?.customer?.[0]?.NAME || null);
    setItems(data.items || []);

     if ( data.items?.length>0) {
     setSelectedITEMVARIETYID(data.items[0].ITEMVARIETYID );
     setSelectedItemVarityName(data.items[0].ItemVarityName );

     setSelectedItemName(data.items[0].NAME || '');
       setFormData((prev) => ({
      ...prev,
      ItemId: data.items[0].ITEMID
    }));
  }



    setMessage('');
  };


const fetchSalesUpdate = async (payload :any) => {
  try {

    const res = await fetch(
      `/api/sales?salesId=${payload.SalesId}&dataAreaid=${payload.Site}`
    );

    const data = await res.json();


     // ✅ CHECK DATA NOT FOUND
  if (!data || !data.customer?.length) {
    setMessage(`No data found  for this ${payload.SalesId} Sales Order`);
    return;
  }


const res1 = await fetch(`/api/emaildeparts/${capaID}`);
const result = await res1.json();

  const selectedIds =
      result?.data?.map((x: any) => Number(x.Id)) || [];


      setSelectedDepartments(selectedIds);

     // setDataDepartmentRecords(result.data);

    setCustomer(data?.customer?.[0]?.NAME || null);
    setItems(data.items || []);

     if ( data.items?.length>0) {
     setSelectedITEMVARIETYID(data.items[0].ITEMVARIETYID );
     setSelectedItemVarityName(data.items[0].ItemVarityName );

     setSelectedItemName(data.items[0].NAME || '');
       setFormData((prev) => ({
      ...prev,
      ItemId: data.items[0].ITEMID
    }));
  }

    setFormData(payload);

    setMessage('');

     } catch (error) {
    console.error(error);
  }
  };



  useEffect(() => {
    const UserID = localStorage.getItem('UserID');
     const DepartmentId = localStorage.getItem('DepartmentId');

     setUserId(UserID);
     setDepartmentId(DepartmentId);

    if (editingData!=null) {

    fetchSalesUpdate(editingData);

    }

 else
  {
     setFormData(initialForm);
     setCustomer('');
     setSelectedITEMVARIETYID('');
     setSelectedItemVarityName('');
     setSelectedItemName('');
     setSelectedDepartments([])

    }


    const storedSite = localStorage.getItem("site");
    if (storedSite) setSite(storedSite);

  }, [capaID]);




const handleCheckboxChange = (id: any) => {
  setSelectedDepartments((prev: any[]) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
  );
};


    type FormError = {
      SalesId?: boolean;
      Site?: boolean;
      ItemId?: boolean;
      Description?: boolean;
      CreatedBy?: boolean;
      ToDepartmentID?: boolean;
      ItemVarietyID?: boolean;
      }


  const [error, setError] = useState<FormError>({});
  const [loading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedItemName, setSelectedItemName] = useState('');



    useEffect(() => {

     const fetchData = async () => {

            const res3 = await axios.get(`api/dynamics?type=departments`);
            setDataDepartmentRecords( res3.data.result.recordset);
              };

    fetchData();
  }, []);





  if (!isOpen) return null;

  // =====================
  // FUNCTIONS
  // =====================
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchSales(initialForm);
    }
  };

    const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...form, [name]: value });

     setFormData(form => ({
      ...form,
      ToDepartmentID: selectedDepartments,
      customer:customer

    }));

    }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

     const newError: FormError = {}; // type-safe
      if (!form.SalesId.trim()) newError.SalesId = true;
      if (!form.ItemId.trim()) newError.ItemId = true;
      if (!form.Description.trim()) newError.Description = true;
      if (selectedDepartments.length === 0) newError.ToDepartmentID = true;

      setError(newError);
      if (Object.keys(newError).length > 0)
       {
       setLoading(false);
       return; // stop if error
       }


       if(editingData!=null)
       {

       try {
      const response = await fetch('/api/capa', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form
          ,ToDepartmentID: (selectedDepartments || []).join(","),
          customer,
          CreatedBy :userId,
          Site:site,
          ItemVarietyID:selectedITEMVARIETYID,
          FromDepartmentID:DepartmentId,
          ItemName:selectedItemName,
          CAPAID:capaID

        })
      });

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
      const response = await fetch('/api/capa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form
          ,ToDepartmentID: (selectedDepartments || []).join(","),
          customer,
          CreatedBy :userId,
          Site:site,
          ItemVarietyID:selectedITEMVARIETYID,
          FromDepartmentID:DepartmentId,
          ItemName:selectedItemName

        })
      });

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
                Sales Order No.
              </label>

              <input
                type="text"
                value={form.SalesId}
                 onChange={(e) =>{ setFormData({ ...form, SalesId: e.target.value });
                 setMessage('');
                         }
                 }

                onKeyDown={handleEnter}

                className={`w-full border rounded px-3 py-2 ${
                error?.SalesId ? "border-red-500" : "border-gray-300" }`}


              />
            </div>

            {/* CUSTOMER */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Customer
              </label>

              <input
                type="text"
                disabled

                value={customer || ''}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* ITEM */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Item ID
              </label>

              <select
                value={form.ItemId}

                onChange={(e) => {
                  const id = e.target.value;
                  const item = items.find((x) => x.ITEMID === id);
                  setSelectedItemName(item?.NAME || '');
                  setFormData({ ...form, ItemId: id });
                }}
              className={`w-full border rounded px-3 py-2 ${
  error?.ItemId ? "border-red-500" : "border-gray-300"
}`}

                 aria-label="ItemId"
              >
                <option value="">Select Item</option>

                {items.map((item, index) => (
                  <option key={index} value={item.ITEMID}>
                    {item.ITEMID}
                  </option>
                ))}
              </select>
            </div>

            {/* ITEM NAME */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>

              <input
                type="text"
                value={selectedItemName}
                disabled
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
               ITEMVARIETYID (Ax Dynamix)
              </label>

              <input
                type="text"
                value={selectedITEMVARIETYID || ''} className="w-full px-3 py-2 border rounded" disabled
              />
            </div>


            <div>
              <label className="block text-sm font-medium mb-1">
                ItemVarityName (Ax Dynamix)
              </label>

              <input
                type="text"
                disabled
                value={selectedItemVarityName || ''}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* ROW 3 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Enter complaint details
            </label>

            <textarea

              name="Description"
              value={form.Description}
              onChange={handleChange}
              rows={3}


className={`w-full border rounded px-3 py-2 ${
  error?.Description ? "border-red-500" : "border-gray-300"
}`}


            />
          </div>

    <div>
      <label className="block text-sm font-medium mb-1">Select to email concern departs</label>
   <div className="flex items-center gap-4 flex-wrap">


{DataDepartmentrecords?.filter(Boolean).map((option: any, index: number) => (
  <label
    key={`${option?.Id}-${index}`}
    className="flex items-center gap-2 text-sm"
  >
    <input
      type="checkbox"
      checked={selectedDepartments.includes(Number(option?.Id))}
      onChange={() => handleCheckboxChange(Number(option?.Id))}
    />
    {option?.DepartmentName}
  </label>
))}
</div>

       <input type="hidden" name="departIds"   value={selectedDepartments.join(",")} />
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
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded"
            >


                {loading ? "Creating..." :  capaID ? ("Update CAPA") : "Create CAPA"}
            </button>
          </div>
        </form>
      </Modal>
    </ComponentCard>
  );
}