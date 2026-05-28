"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { AgGridTable } from '@/components/ui/AgGridTable/AgGridTable';
import { ColDef } from 'ag-grid-community';
import {  AgGridReact } from 'ag-grid-react';
// ✅ REQUIRED (fix for error 272)

import AssignUserModal from '@/components/CAPA/AssignUserModal';

import ComponentCard from "../common/ComponentCard";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

export default function AssignCAPAModal({ capaId, onClose ,setrefreshGrid,StatusId ,TargetDate ,ClosureDate }: any) {

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [refreshAssignGrid, setrefreshAssignGrid] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [gridApi, setGridApi] = useState<any>(null);

  const [action, setAction] = useState<"accept" | "reject" | "">("");
  const [UserID, setUserID] = useState<number>();
  const [remarks, setRemarks] = useState("");
  const [form, setForm] = useState({
    TargetDate: TargetDate,
    ClosureDate: ClosureDate
  });

  useEffect(() => {
  setForm({
    TargetDate: TargetDate
      ? new Date(TargetDate).toISOString().slice(0, 16)
      : "",

    ClosureDate: ClosureDate
      ? new Date(ClosureDate).toISOString().slice(0, 16)
      : ""
  });
}, [TargetDate, ClosureDate]);

  useEffect(() => {
  const id = localStorage.getItem('UserID');

  if(StatusId==6 && action!="reject")
  {
  setAction("accept");
  }
  if (id) setUserID(Number(id));
}, [action]);

const columnDefs: ColDef<any>[] = [

  { field: "AssignmentID", hide: true },
  { field: "UserID", hide: true },
  { field: "FullName", wrapText: true, autoHeight: true },
  { field: "DepartmentName", wrapText: true, autoHeight: true },
  { field: "RoleName", wrapText: true, autoHeight: true },


   {
  headerName: "Actions",
  minWidth: 30,
  colId: "action",
  pinned: "right",
  editable: false,

  cellRenderer: (params: any) => (
    <div className="flex gap-2">

      {/* DELETE */}

       <button  onClick={(e) =>

       {
        e.stopPropagation();
        deleteRow(params.data.AssignmentID);
        setShowDelete(true);

         }
     }

        className="inline-flex items-center p-1 rounded hover:bg-gray-100 text-red-600" title="Delete" >
       <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
       <path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>

       </button>



    </div>
  ),
},


];




  async function fetchCAPAs() {
    try {

    const res =   await axios.post("/api/capa/assign/getcapausersbycapaid", {
    CAPAID: capaId
    });
           setUsers(res.data.data);

    } catch (error) {
     alert(error );
    }
  }

     useEffect(() => {
        fetchCAPAs();
         setrefreshGrid(true);
    }, [refreshAssignGrid]);

// DELETE
  const deleteRow = async (id: number) => {
await fetch("/api/capa/assign/delete", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    CAPAID: capaId,
    AssignmentID: id
  })
});

    setrefreshGrid(false);
    setrefreshAssignGrid(false);
    fetchCAPAs();
    setShowDelete(false)
  };



const [error, setError] = useState<any>({});


//   useEffect(() => {
//   async function fetchData() {
//     try {



//     const res =   await axios.post("/api/capa/assign/getcapausersbycapaid", {
//     CAPAID: capaId
//     });
//     setUsers(res.data.data);

//     } catch (error) {
//      alert(error );
//     }
//   }
//   fetchData();
// }, []);

// const [selectedUsersCheckBox, setSelectedUsersCheckBox] = useState<number[]>([]);

// const onSelectionChanged = (event: any) => {
//   const selectedRows = event.api.getSelectedRows();

//   // ✅ correct debug
//  // alert("Selected Rows:"+ selectedRows);

//   // ⚠️ check multiple possible keys
//   const ids = selectedRows.map((row: any) =>
//     row.UserID ?? row.UserId ?? row.userid
//   );

//   //alert("IDs:"+ ids);

//   setSelectedUsersCheckBox(ids);
// };

// const onGridReady = (params:any) => {
// setGridApi(params.api);
//   params.api.sizeColumnsToFit(); // fit to screen
// };
// const defaultColDef = { editable: true, minWidth: 140, sortable: true, flex: 1, resizable: true, filter: true };
  

const handleSubmit = async () => {

  /*
  if (selectedUsersCheckBox.length === 0 && action === "accept") {
    alert("Select at least one user");
    return;
  }
  */


  const newError: any = {};

  if (!form.TargetDate && action === "accept") newError.TargetDate = true;
  if (!form.ClosureDate && action === "accept") newError.ClosureDate = true;
/*
  if (action === "accept" && selectedUsersCheckBox.length === 0) {
    newError.Users = true;
  }
*/

  if (action === "reject" && !remarks.trim()) {
    newError.Remarks = true;
  }

  setError(newError);

  if (Object.keys(newError).length > 0) return


  await axios.post("/api/capa/acceptorreject", {
    CAPAID: capaId,
    TargetDate:action === "accept"?(new Date(form.TargetDate).toISOString()):"" ,
    ClosureDate: action === "accept"? (new Date(form.ClosureDate).toISOString()):"" ,
    StatusId: action,
    RejectRemarks:remarks,
    CreatedBy:UserID
  });

  setrefreshGrid(true);
  onClose();
};

  //  const handleOpen = (e: any, capaId: number) => {
  //   e.stopPropagation(); // prevent row click

  //   setrefreshGrid(false);
  //   setrefreshAssignGrid(false);
  //   setOpenModal(true);
  // };

  return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center" onClick={onClose}>
  <div className="bg-white p-5 rounded-xl w-[80vw] max-w-[800px]"  onClick={(e) => e.stopPropagation()}>

 {/* Popup Render */}
      {/* {
        openModal && (
        <AssignUserModal
          capaId={capaId}
          onClose={() => setOpenModal(false)}
          setrefreshGrid={setrefreshGrid}
           setrefreshAssignGrid={setrefreshAssignGrid}

        />
      )} */}
   <h2 className="text-lg font-semibold mb-4">Assign CAPA</h2>

    <div className="flex gap-2 mb-4">
  <button
    onClick={() => setAction("accept")}
    className={`px-3 py-1 rounded ${action === "accept"  ? "bg-green-600 text-white" : "border"}`}
  >
    Accept
  </button>

  <button
    onClick={() => setAction("reject")}
    className={`px-3 py-1 rounded ${action === "reject" ? "bg-red-600 text-white" : "border"}`}
  >
    Reject
  </button>

{/* { action === "accept" || StatusId==6  ? (
  <button
   onClick={(e) => handleOpen(e, Number(capaId))}
    className={"px-3 flex justify-right gap-2  py-1 rounded  bg-blue-600 text-white"}
  >
    Assign User
  </button>) : ""
  } */}
</div>

{action === "reject"  && (
<>
  <textarea
    className="w-full border p-2 mb-3"
    placeholder="Enter rejection reason"
    value={remarks}
    onChange={(e) => setRemarks(e.target.value)}
  />

</>


)}

{action === "accept" && (
  <>

{/*
  <input
  type="text"
  placeholder="Search users..."
  className="w-full border p-2 rounded mb-3"
  value={searchText}
  onChange={(e) => {
    setSearchText(e.target.value);

    gridApi?.setGridOption(
      "quickFilterText",
      e.target.value
    );
  }}
/>

*/}



  <div className="flex gap-5 items-end mb-3">

  <div className="flex-1">
    <label className="block mb-1 font-medium">
      Target Date
    </label>

    <input
      type="datetime-local"
      className={`w-full border p-2 rounded ${
        error.TargetDate ? "border-red-500" : "border-gray-300"
      }`}
      value={form.TargetDate}
      onChange={(e) =>
        setForm({ ...form, TargetDate: e.target.value })
      }
    />
  </div>

  <div className="flex-1">
    <label className="block mb-1 font-medium">
      Closure Date
    </label>

    <input
      type="datetime-local"
      className={`w-full border p-2 rounded ${
        error.ClosureDate ? "border-red-500" : "border-gray-300"
      }`}
      value={form.ClosureDate}
      onChange={(e) =>
        setForm({ ...form, ClosureDate: e.target.value })
      }
    />
  </div>

</div>
       {/* <div style={{ width: "100%", height: "300px" }}>
    <div className="ag-theme-alpine w-full h-full">
                            <AgGridReact
                            rowSelection="multiple"
                             onSelectionChanged={onSelectionChanged}
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
                            </div>
                            </div> */}


  </>
)
}


        <div className="flex justify-end gap-2">
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