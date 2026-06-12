"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { AgGridTable } from '@/components/ui/AgGridTable/AgGridTable';
import { ColDef } from 'ag-grid-community';
import {  AgGridReact } from 'ag-grid-react';

// ✅ REQUIRED (fix for error 272)

import ComponentCard from "../common/ComponentCard";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AssignUserModal({ capaId, onClose ,setrefreshAssignGrid }: any) {

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  const [searchText, setSearchText] = useState("");
  const [gridApi, setGridApi] = useState<any>(null);

  const [UserID, setUserID] = useState<number>();


  useEffect(() => {
  const id = localStorage.getItem('UserID');
  if (id) setUserID(Number(id));
}, []);

const columnDefs: ColDef<any>[] = [
  {
    headerName: "",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    pinned: "left",
  },
  { field: "UserID", hide: true },
  { field: "FullName", wrapText: true, autoHeight: true },
  { field: "DepartmentName", wrapText: true, autoHeight: true },
  { field: "RoleName", wrapText: true, autoHeight: true }
];


const [error, setError] = useState<any>({});
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

const [selectedUsersCheckBox, setSelectedUsersCheckBox] = useState<number[]>([]);

const onSelectionChanged = (event: any) => {
  const selectedRows = event.api.getSelectedRows();

  // ✅ correct debug
 // alert("Selected Rows:"+ selectedRows);

  // ⚠️ check multiple possible keys
  const ids = selectedRows.map((row: any) =>
    row.UserID ?? row.UserId ?? row.userid
  );

  //alert("IDs:"+ ids);

  setSelectedUsersCheckBox(ids);
};
const onGridReady = (params:any) => {
setGridApi(params.api);
  params.api.sizeColumnsToFit(); // fit to screen
};
const defaultColDef = { editable: true, minWidth: 140, sortable: true, flex: 1, resizable: true, filter: true };
  const handleSubmit = async () => {


  if (selectedUsersCheckBox.length === 0 ) {
    alert("Select at least one user");
    return;
  }


  const newError: any = {};


  if ( selectedUsersCheckBox.length === 0) {
    newError.Users = true;
  }

  setError(newError);

  if (Object.keys(newError).length > 0) return


  await axios.post("/api/capa/assign", {
    CAPAID: capaId,
    UserIDs: selectedUsersCheckBox.length > 0 ? selectedUsersCheckBox.join(",") : null, // ✅ FIXED
    CreatedBy:UserID
  });

  setrefreshAssignGrid(new Date().toLocaleString());
  onClose();
};

  return (
<div
 className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  onClick={onClose}
>
  <div
    className="bg-white p-5 rounded-xl w-[80vw] max-w-[900px] flex flex-col space-y-3 relative z-50"
    onClick={(e) => e.stopPropagation()}
  >

    {/* Search */}
    <input
      type="text"
      placeholder="Search users..."
      className="w-full border p-2 rounded"
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
        gridApi?.setGridOption("quickFilterText", e.target.value);
      }}
    />

    {/* Grid */}
    <div className="px-2">
         <div style={{ width: "100%", height: "300px" }}>
    <div className="ag-theme-alpine w-full h-full">
          <AgGridReact
              rowSelection="multiple"
              theme="legacy"
              domLayout="autoHeight"
            onSelectionChanged={onSelectionChanged}
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            rowHeight={28}
            headerHeight={32}
            rowData={users}
            paginationPageSize={9}
          />
        </div>
      </div>
    </div>


    {/* Buttons */}
    <div className="flex justify-end gap-2 pt-2 border-t mt-20">
      <button onClick={onClose} className="border px-3 py-1">
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-3 py-1"
      >
        Save
      </button>
    </div>

  </div>
</div>

  );
}