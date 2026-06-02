'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ComponentCard from "../common/ComponentCard";
import { Modal } from "../ui/modal";
import { useModal } from "@/hooks/useModal";

export default function CreateCAPAModal({ isOpen, onClose, onSuccess ,editingData , Id ,setrefreshGrid }: any) {


  // =====================
  // ✅ STATE (ALL HOOKS FIRST)
  // =====================
  const [customer, setCustomer] = useState<any>(null);
   const [ACCOUNTNUM, setACCOUNTNUM] = useState<any>(null);


  const [items, setItems] = useState<any[]>([]);
  const [site, setSite] = useState<string | null>(null);
  const [message, setMessage] = useState('');
   const [userId, setUserId] = useState<string | null>(null);

   const [selectedITEMVARIETYID, setSelectedITEMVARIETYID] = useState('');
   const [selectedItemVarityName, setSelectedItemVarityName] = useState('');
   const [editing, setEditing] = useState<any | null>(null);

 
console.log(editingData)

type FormType = {
  SalesId: string;
  Site: string;
  ItemId: string;
  CreatedBy: string | null;
  ItemVarietyID: string;
  ACCOUNTNUM:any;
  ProductionDate:string;
  RFNItemNumber:string;
  LotNumber:string;
  ExpiryDate:string
};


const initialForm: FormType = {
  SalesId: '',
  Site: '',
  ItemId: '',
  CreatedBy: userId,
  ItemVarietyID: selectedITEMVARIETYID,
  ACCOUNTNUM:'',
  ProductionDate:'',
  RFNItemNumber:'',
  LotNumber:'',
  ExpiryDate:''
};



const [form, setFormData] = useState<FormType>(initialForm);

  const fetchSales = async (initialForm :any) => {

    if (!form.SalesId) {
     setFormData(initialForm);
     setCustomer('');
     setACCOUNTNUM('');
     setSelectedITEMVARIETYID('');
     setSelectedItemVarityName('');
     setSelectedItemName('');


     setMessage("Enter sale order no.");
      return;
    }

    const res = await fetch(
  `/api/sales?salesId=${form.SalesId}&dataAreaid=${site}`
);

    const data = await res.json();


     // ✅ CHECK DATA NOT FOUND
  if (!data || !data.customer?.length) {
    setMessage(`No data found  for this ${initialForm.SalesId} Sales Order`);
    return;
  }

    setCustomer(data?.customer?.[0]?.NAME || null);
    setACCOUNTNUM(data?.customer?.[0]?.ACCOUNTNUM || null)
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


     // setDataDepartmentRecords(result.data);

    setCustomer(data?.customer?.[0]?.NAME || null);
     setACCOUNTNUM(data?.customer?.[0]?.ACCOUNTNUM || null)
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

 if(Id==null)
 {    setFormData(null)
     setFormData(initialForm);
     setCustomer('');
      setSelectedItemName('');
     setACCOUNTNUM('');
     setSelectedITEMVARIETYID('');
     setSelectedItemVarityName('');
     setSelectedItemName('');


 }


  }, []);


  useEffect(() => {


    const UserID = localStorage.getItem('UserID');

     setUserId(UserID);


    if (editingData!=null) {

    fetchSalesUpdate(editingData);

    }

 else
  {


      setFormData(null)
     setFormData(initialForm);
     setCustomer('');
      setSelectedItemName('');
     setACCOUNTNUM('');
     setSelectedITEMVARIETYID('');
     setSelectedItemVarityName('');
     setSelectedItemName('');

    }

    const storedSite = localStorage.getItem("site");
    if (storedSite) setSite(storedSite);

  }, [Id]);






    type FormError = {
      SalesId?: boolean;
      Site?: boolean;
      ItemId?: boolean;
      CreatedBy?: boolean;
      ItemVarietyID?: boolean;
      RFNItemNumber?: boolean;
      LotNumber?:boolean;
      ExpiryDate?:boolean;
      ProductionDate?:boolean;
      }



  const [error, setError] = useState<FormError>({});
  const [loading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedItemName, setSelectedItemName] = useState('');








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

 // Convert SQL datetime (e.g., "2025-06-01 14:30:00") to datetime-local string ("2025-06-01T14:30")
const sqlToDatetimeLocal = (sqlDateTime :any) => {
  if (!sqlDateTime) return '';
  // Replace space with 'T' and truncate seconds if present
  return sqlDateTime.replace(' ', 'T').slice(0, 16);
};

// Convert datetime-local string to SQL datetime string
const datetimeLocalToSql = (localDateTime :any) => {
  if (!localDateTime) return null;
  // Replace 'T' with space and add seconds (or keep as needed)
  return localDateTime.replace('T', ' ') + ':00';
};

    const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...form, [name]: value });

     setFormData(form => ({
      ...form,
      customer:customer

    }));

    }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

  const newError: FormError = {}; // type-safe
  if (!form.SalesId.trim()) newError.SalesId = true;
  if (!form.ItemId.trim()) newError.ItemId = true;
 if (!form.ProductionDate.trim()) newError.ProductionDate = true;
 if (!form.RFNItemNumber.trim()) newError.RFNItemNumber = true;
 if (!form.LotNumber.trim()) newError.LotNumber = true;
 if (!form.ExpiryDate.trim()) newError.ExpiryDate = true;



      setError(newError);
      if (Object.keys(newError).length > 0)
       {
       setLoading(false);
       return; // stop if error
       }

       if(editingData!=null)
       {

       try {
      const response = await fetch('/api/qa', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          PreparedBy :userId,
          Site:site,
          ItemVarietyID:selectedITEMVARIETYID,
          ItemName:selectedItemName,
          ACCOUNTNUM:ACCOUNTNUM,
          ProductionDate: form.ProductionDate
    ? new Date(form.ProductionDate).toISOString()
    : null
,
    ExpiryDate: form.ExpiryDate
    ? new Date(form.ExpiryDate).toISOString()
    : null
        })
      });

      if (!response.ok)
      {

         setMessage("Request failed");
      
  return;
}

      setEditing(null);
      toast.success("COA Created Successfully");
      onSuccess();
    } catch (error) {
      toast.error('Failed to create COA');
      console.error(error);
    } finally {
      setLoading(false);
     setrefreshGrid(new Date().toISOString());
    }


       }

else

    try {
      const response = await fetch('/api/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          PreparedBy :userId,
          Site:site,
          ItemVarietyID:selectedITEMVARIETYID,
          ItemName:selectedItemName,
          ACCOUNTNUM:ACCOUNTNUM,
          ProductionDate: form.ProductionDate
    ? new Date(form.ProductionDate).toISOString()
    : null
,
    ExpiryDate: form.ExpiryDate
    ? new Date(form.ExpiryDate).toISOString()
    : null
        })
      });

        const data = await response.json();

    if (!data.success)
      {
      setMessage (data.message);
      return;
}
 setrefreshGrid(new Date().toISOString());
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
                Customer ({ACCOUNTNUM})
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
              Production Date
              </label>

            <input
  type="datetime-local"
  value={form.ProductionDate ? sqlToDatetimeLocal(form.ProductionDate) : ''}
  onChange={(e) => {
    const localValue = e.target.value;
    const sqlValue = datetimeLocalToSql(localValue);
    setFormData({ ...form, ProductionDate: sqlValue });
  }}
  className={`w-full border rounded px-3 py-2 ${
    error?.ProductionDate ? "border-red-500" : "border-gray-300"
  }`}
/>
            </div>


           <div>
              <label className="block text-sm font-medium mb-1">
            Expiry Date
              </label>

             <input
  type="datetime-local"
  value={form.ExpiryDate ? sqlToDatetimeLocal(form.ExpiryDate) : ''}
  onChange={(e) => {
    const localValue = e.target.value;
    const sqlValue = datetimeLocalToSql(localValue);
    setFormData({ ...form, ExpiryDate: sqlValue });
  }}
  className={`w-full border rounded px-3 py-2 ${
    error?.ExpiryDate ? "border-red-500" : "border-gray-300"
  }`}
/>
            </div>

          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
            Lot Number
              </label>

              <input
                type="text"
                value={form.LotNumber}
                 onChange={(e) =>{ setFormData({ ...form, LotNumber: e.target.value }); }}

                 className={`w-full border rounded px-3 py-2 ${
  error?.LotNumber ? "border-red-500" : "border-gray-300"
}`}
              />
            </div>


            <div>
               <label className="block text-sm font-medium mb-1">
              RFN Item  Number
              </label>

              <input
                type="text"

                 value={form.RFNItemNumber}
                 onChange={(e) =>{ setFormData({ ...form, RFNItemNumber: e.target.value }); }}
               className={`w-full border rounded px-3 py-2 ${
  error?.RFNItemNumber ? "border-red-500" : "border-gray-300"
}`}
              />
            </div>
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


                {loading ? "Creating..." :  Id ? ("Update COA") : "Create COA"}
            </button>
          </div>
        </form>
      </Modal>
    </ComponentCard>
  );
}