"use client";
import { useEffect, useState } from "react";
import axios from 'axios';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
// ✅ REQUIRED (fix for error 272)
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);


import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useSearchParams, useParams } from "next/navigation";

const ProductChemicalParametersCard = ({  id }:any) => {

const [selectedProductAnalysis, setSelectedProductAnalysis] =useState('')
const [certificationName, setProductAnalysisName] =useState('')

 const defaultColDef = { editable: true, sortable: true, flex: 1, resizable: true, filter: true };
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [rowData, setRowData] = useState<any[]>([]);
  const [ProductName, setProductName] = useState('');
  const [editing, setEditing] = useState<any | null>(null);
const [records, setRecords] = useState<any[]>([]);
    const [form, setForm] = useState({
    ProductId: "",
    Material: "",
    NetWeight:"",
    IsActive: false,
  });



    // LOAD
  const loadData = async () => {

   const res1 = await axios.get(`/api/dynamics?type=analysiscategories`);
         setRecords( res1.data.result.recordset);

      const res = await fetch(`/api/productanalysis/${id}`);
      const result = await res.json();
     // setProductName(result.data[0].ProductName)
      setRowData(result.data);
  };

   useEffect( () => {
    
    loadData();
  }, []);


    const newError: FormError = {}; // type-safe

    type FormError = {
      ProductAnalysisName?: boolean;

};
const [error, setError] = useState({
  ProductAnalysisName: "",
});
  // INSERT
  const addRow = async () => {

   setEditing(null);
     setForm({
      Id:"",
     ProductId: id,
     CategoryId: "",
     ParameterName:"",
     Unit:"",
     Limits:"",
     Status:"",
      IsActive: true,
    });
    setShowModal(true);

  };



    // SAVE TO GRID
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

  if (!form.ParameterName) {
    setError({ ParameterName: "Required" });
    return false;
  }

    if (!form.Unit) {
    setError({ Unit: "Required" });
    return false;
  }

     if (!form.Limits) {
    setError({ Limits: "Required" });
    return false;
  }

     if (!form.Status) {
    setError({ Status: "Required" });
    return false;
  }
   setError({ ParameterName: "" });
   setError({ Unit: "" });
   setError({ Limits: "" });
   setError({ Status: "" });



   if (editing) {



await fetch(`/api/productanalysis/${editing.Id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({

    ProductId: form.ProductId,
    CategoryId: form.CategoryId,
    ParameterName: form.ParameterName,
     Unit: form.Unit,
      Limits: form.Limits,
      Status: form.Status,
    IsActive: form.IsActive,
  }),
});


     }

     else

     {

    await fetch("/api/productanalysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       
    ProductId: id,
    CategoryId: form.CategoryId,
    ParameterName: form.ParameterName,
     Unit: form.Unit,
      Limits: form.Limits,
      Status: form.Status,
      IsActive: form.IsActive,
      }),
    });




    }

     loadData()
     setShowModal(false);
  };


    // UPDATE
  const updateRow = async (row: any) => {

     setEditing(row);
     setForm({
      ProductId: id,
      CategoryId: row.CategoryId,
      ParameterName: row.ParameterName,
      Unit: row.Unit,
      Limits: row.Limits,
      Status: row.Status,


      IsActive: row.IsActive,
    });
    setShowModal(true);

  };



  // DELETE
  const deleteRow = async (id: number) => {

 await fetch(`/api/productanalysis/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
    loadData();
    setShowDelete(false)
  };

    // CELL EDIT EVENT
  //const onCellValueChanged = (params: any) => {
   // updateRow(params.data);
  //};

const onGridReady = (params) => {
  params.api.sizeColumnsToFit(); // fit to screen
};

  const columnDefs = [
  { field: "Id", editable: false , hide: true },
  { field: "CategoryId", hide: true }, //
  { field: "ProductId", editable: false , hide: true },
  { field: "CategoryName" , editable: false  , flex: 2, minWidth: 200 },
  { field: "ParameterName", headerName: "Parameter"  , flex: 2, minWidth: 200},
  { field: "Unit" },
  { field: "Limits" },
  { field: "Status" },

    {
      field: "IsActive",
      editable: true,
      cellEditor: "agCheckboxCellEditor",
    },

  {
  headerName: "Actions",
  minWidth: 100,
  colId: "action",
  pinned: "right",
  editable: false,

  cellRenderer: (params: any) => (
    <div className="flex gap-2">

        {/* UPDATE */}
       <button  onClick={(e) => {
           e.stopPropagation();
           updateRow(params.data)
           }
           }

 className="inline-flex items-center p-1 rounded hover:bg-gray-100 mr-2" title="Edit" >
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0L15.13 4.9l3.75 3.75 1.83-1.61z"/></svg>
         </button>


      {/* DELETE */}


       <button  onClick={(e) => {

        e.stopPropagation();
        setSelectedProductAnalysis(params.data.Id);
        setProductAnalysisName(params.data.ParameterName)
        setShowDelete(true);
}}

        className="inline-flex items-center p-1 rounded hover:bg-gray-100 text-red-600" title="Delete" >
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>


    </div>
  ),
},
  ];

 
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">

{/* HEADER */}
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
      Typical Analysis
    </h4>

    <button
      onClick={addRow}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
       Add New
    </button>
  </div>
<br/>


{Array.isArray(rowData) ? (
  rowData.length > 0 ? (
   <div style={{ width: "100%",  height: "auto" }}>
  <div className="ag-theme-alpine" style={{ width: "100%", height: "auto" }}>
    <AgGridReact
      theme="legacy"
      domLayout="autoHeight"
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      onGridReady={onGridReady}
      rowHeight={28}
      headerHeight={32}
      suppressRowClickSelection={true}
      suppressCellFocus={true}
      pagination={true}
      paginationPageSize={100}


    />
  </div>
</div>
  ) : (
    <div>No data found</div>
  )
) : (
  <div>Loading...</div>
)}


{/* POPUP MODAL */}
      {showModal && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm shadow-2xl">
       <div className="bg-gray-50 p-5 rounded-xl w-[350px] shadow-2xl">

            <h3 className="text-lg font-semibold mb-3">
              Add Analysis Categories
            </h3>
         <form className="flex flex-col" onSubmit={submit}>
            {/* ProductId */}
            <input
             readOnly
              className="border p-2 w-full mb-2 hidden"
              placeholder="Product Id"
              value={form.ProductId}
              onChange={(e) =>
                setForm({ ...form, ProductId: e.target.value })

              }
            />

         
      
           <select
            key={"0"}
            name="CategoryId"
            id="CategoryId"
            value={form.CategoryId}
            onChange={(e) =>{ 
                setForm({ ...form, CategoryId : e.target.value })
              }}

            className={`w-full border rounded px-3 py-2 ${
            error.CategoryId ? "border-red-500" : "border-gray-300" }`} aria-label="CategoryName"
          >
          <option value="" disabled>Select CategoryName</option>
            {records?.length > 0 ? (
              records.map((id) => (
                <option key={id.Id} value={id.Id}>
                  {id.CategoryName}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
   <br/>

            {/* Name */}
            <input
              className={`w-full px-3 py-2 border rounded-lg ${error?.ParameterName  ? "border-red-500" : "border-gray-300"}`}
              placeholder="ParameterName "
              value={form.ParameterName }
               onChange={(e) =>
                setForm({ ...form, ParameterName : e.target.value })
              }
            />
<br/>
           <input
              className={`w-full px-3 py-2 border rounded-lg ${error?.Unit ? "border-red-500" : "border-gray-300"}`}
              placeholder="Unit "
              value={form.Unit}

              onChange={(e) =>
                setForm({ ...form, Unit: e.target.value })
              }
            />
<br/>


     <input
           className={`w-full px-3 py-2 border rounded-lg ${error?.Limits  ? "border-red-500" : "border-gray-300"}`}
              placeholder="Limits "
              value={form.Limits }

              onChange={(e) =>
                setForm({ ...form, Limits: e.target.value })
              }
            />
<br/>

     <input
           className={`w-full px-3 py-2 border rounded-lg ${error?.Status  ? "border-red-500" : "border-gray-300"}`}
              placeholder="Status "
              value={form.Status }

              onChange={(e) =>
                setForm({ ...form, Status: e.target.value })
              }
            />
<br/>




            {/* Active */}
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={form.IsActive}
                onChange={(e) =>
                  setForm({ ...form, IsActive: e.target.checked })
                }
              />
              Active
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
              type="submit"  className="px-3 py-1 bg-green-600 text-white rounded">
                {  editing? "Update":"Save" }
              </button>

            </div>
             </form>
          </div>



 </div>
      )}



  {showDelete && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="bg-white rounded-xl shadow-2xl w-[420px] p-6 animate-scaleIn">

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 p-3 rounded-full">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Delete ProductAnalysis
      </h2>

      {/* Message */}
      <p className="text-gray-500 text-center mt-2">
        Are you sure you want to delete
        <span className="font-semibold text-red-600">
          {" "} { certificationName}
        </span> ?
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">

        <button
          onClick={() => setShowDelete(false)}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => deleteRow(selectedProductAnalysis)}
          className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow"
        >
          Delete
        </button>

      </div>

    </div>
  </div>
)}
</div>

  );
}

export default ProductChemicalParametersCard;
