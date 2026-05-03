"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { AgGridTable } from '@/components/ui/AgGridTable/AgGridTable';
import { ColDef } from 'ag-grid-community';
import {  AgGridReact } from 'ag-grid-react';
// ✅ REQUIRED (fix for error 272)
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AssignCAPAModal({ capaId, onClose }: any) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  const [form, setForm] = useState({
    TargetDate: "",
    ClosureDate: "",
    StatusId: 2
  });

  

 const columnDefs = [
    { field: "UserID", editable: false , hide: true },


    { field: "FullName", editable: true   , wrapText:true,  autoHeight:true,},
     { field: "DepartmentName", editable: true   , wrapText:true,  autoHeight:true,},
         { field: "RoleName", editable: true   , wrapText:true,  autoHeight:true,}
     
     ,

  
  {
  headerName: "Actions",
  minWidth: 50,
  colId: "action",
  pinned: "right" as const, 
  editable: false,

  cellRenderer: (params: any) => (
    <div className="flex gap-2">

      

      {/* DELETE */}


       <button  onClick={(e) => {

        e.stopPropagation();
       
}}

        className="inline-flex items-center p-1 rounded hover:bg-gray-100 text-red-600" title="Delete" >
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </button>


    </div>
  ),
},
  ];

  useEffect(() => {
  async function fetchData() {
    try {
         const res1 = await axios.get(`/api/dynamics?type=users`);
         setUsers( res1.data.result.recordset);

    } catch (error) {
     alert(error );
    }
  }
  fetchData();
}, []);

const onGridReady = (params:any) => {
  params.api.sizeColumnsToFit(); // fit to screen
};
const defaultColDef = { editable: true, minWidth: 140, sortable: true, flex: 1, resizable: true, filter: true };
  const handleSubmit = async () => {
    if (selectedUsers.length === 0) {
      alert("Select at least one user");
      return;
    }

    await axios.post("/api/capa/assign", {
      CAPAID: capaId,
      AssignedTo: selectedUsers,
      TargetDate: form.TargetDate,
      ClosureDate: form.ClosureDate,
      StatusId: form.StatusId
    });

    alert("CAPA Assigned");
    onClose();
  };

  return (
    <div 
 
        className="  fixed inset-0 bg-black/40 flex items-center justify-center"
         onClick={onClose}>

      <div
        className="bg-white p-5 rounded-xl w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Assign CAPA</h2>

          {!users ? (
          <div>Loading...</div>
        ) : users.length === 0 ? (
          <div>No data found</div>
        ) : (
       
         <div style={{ width: "140%",  height: "auto" }}>
  <div className="ag-theme-alpine" style={{ width: "130%", height: "auto" }}>
                            <AgGridReact
                             theme="legacy"
        domLayout="autoHeight"
                                onGridReady={onGridReady}
                                columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      pagination={true}
      rowHeight={28}
      headerHeight={32}
                                rowData={users}
      
   
   
                           
                                paginationPageSize={5}
                            /> 
                            </div></div>
                            )
                            }
                   
                
        

        {/* Multi User 
        <select
          multiple
          className="w-full border p-2 mb-3 h-[120px]"
          onChange={(e) => {
            const values = Array.from(e.target.selectedOptions)
              .map(o => Number(o.value));
            setSelectedUsers(values);
          }}
        >
          {users.map((u: any) => (
            <option key={u.UserID} value={u.UserID}>
              {u.FullName}
            </option>
          ))}
        </select>
*/}
        {/* Target Date */}
        <input
          type="date"
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, TargetDate: e.target.value })}
        />

        {/* Closure Date */}
        <input
          type="date"
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, ClosureDate: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-3 py-1">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-3 py-1"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}