"use client";
import { useEffect, useState } from "react";
import axios from 'axios';
import {  AgGridReact } from 'ag-grid-react';
// ✅ REQUIRED (fix for error 272)
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

import {
  Search,
  Filter,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Plus,
  // Add these for fail/pass icons
  XCircle,        // For fail/error/invalid
  CheckCircle,    // For pass/success/valid
  // Alternative options:
  ThumbsDown,     // For fail
  ThumbsUp,       // For pass
  Ban,            // Alternative fail icon
  ShieldCheck,    // Alternative pass icon
  AlertCircle,    // Warning/fail variant
  CircleCheckBig, // Another success icon
  CircleX         // Another error icon
} from "lucide-react";

const ProductChemicalParametersCard = ({  id }:any) => {


const [message, setMessage] = useState('');
const [selectedProductAnalysis, setSelectedProductAnalysis] = useState<number | null>(null);
const [certificationName, setProductAnalysisName] =useState('')

 const defaultColDef = { editable: true, sortable: true, flex: 1, resizable: true, filter: true };
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [rowData, setRowData] = useState<any[]>([]);


const [site, setSite] = useState<string | null>(null);
const [userId, setUserId] = useState<string | null>(null);
const [RoleId, setRoleId] = useState<any>(null);

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


const fetchChemical =  async () => {

    try {
    
       const res = await fetch(`/api/qa/generate-qa-test-results?id=${id}`);
       const result = await res.json();

      if (result.success) {
         setRowData(result.data);
       }

    } catch (error:any) {
      
      console.error(error);


    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {

    const fetchChemical =  async (Id:any) => {

    try {
    
       const res = await fetch(`/api/qa/generate-qa-test-results?id=${Id}`);
       const result = await res.json();

      if (result.success) {
         setRowData(result.data);
       }

    } catch (error:any) {
      
      console.error(error);


    } finally {
      setLoading(false);
    }
  }
  
    fetchChemical(id)
   
 }, [id ]);

 
 useEffect(() => {
   if (id) {
    
    const UserID = localStorage.getItem('UserID');
     setUserId(UserID);
     const storedSite = localStorage.getItem("site");
  const RoleId = localStorage.getItem("roleId");
         setRoleId((RoleId));

        

    if (storedSite) setSite(storedSite);
     fetchDetails(id);
   }
 }, [id]);


const refreshrowRengenerate = async () => {
 


  try {
      const response = await fetch('/api/qa/refresh-again-generate-qa-test-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           PreparedBy :userId,
           COAID:details?.coa.Id,
           ItemVarietyID:details.coa.ItemVarietyID,
        })
      });

        const data = await response.json();
       fetchChemical()
       fetchDetails(id)

    if (!data.success)
      {
      setMessage (data.message);
      return;
     }

    } catch (error:any) {
      
      console.error(error);


    } finally {
      setLoading(false);
    }


}

 
const addRow = async () => {

  try {
      const response = await fetch('/api/qa/generate-qa-test-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           PreparedBy :userId,
           COAID:details?.coa.Id,
           ItemVarietyID:details.coa.ItemVarietyID,
        })
      });

        const data = await response.json();
      fetchChemical()
      fetchDetails(id)

    if (!data.success)
      {
      setMessage (data.message);
      return;
     }

    } catch (error:any) {
      
      console.error(error);


    } finally {
      setLoading(false);
    }


}

const viewReport = async () => {

   const response = await fetch('/api/qa/generate-coa-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coaId: 'R0005' }), // pass the COA identifier
  });
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'COA_report.pdf';
  a.click();

}



const Approved = async () => {

     try {
    await fetch("/api/qa/approvedallupdateqatestresult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        COAID:details?.coa.Id,
        UserID :userId,
      }),
    });
 fetchChemical()
 fetchDetails(id)
  
  } catch (error) {
    console.error(error);
  }
   
  };

    // UPDATE
  const Verified = async () => {

     try {
    await fetch("/api/qa/verifiedallupdateqatestresult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        COAID:details?.coa.Id,
        UserID :userId,
      }),
    });
 fetchChemical()
 fetchDetails(id)
  
  } catch (error) {
    console.error(error);
  }
   
  };



  // DELETE
  const deleteRow = async (id: number) => {

 await fetch(`/api/deleteqatestresult/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
    fetchChemical()
    fetchDetails(id)
    setShowDelete(false)
  };

    // CELL EDIT EVENT
  //const onCellValueChanged = (params: any) => {
   // updateRow(params.data);
  //};


  const onCellValueChanged = async (params:any) => {
  // Skip if value didn't change
  if (params.oldValue === params.newValue) return;

  const field = params.colDef.field;
  // console.log(params.data.TestResultID)
  // console.log(params.colDef.field)
  // console.log(params.data[field])
  try {
    await fetch("/api/qa/updateqatestresult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        COAID:details?.coa.Id,
        UserID:userId,
        Id: params.data.TestResultID,
        FieldName: params.colDef.field,
        Value: params.data[field],
      }),
    });

     fetchChemical()
     fetchDetails(id)
    // setNotify({
    //   isOpen: true,
    //   message: "Updated Successfully",
    //   type: "success",
    // });
  } catch (error) {
    console.error(error);
  }
};

const onGridReady = (params:any) => {
  params.api.sizeColumnsToFit(); // fit to screen
};

  const columnDefs = [
  { field: "TestResultID", editable: false , hide: true },
  { field: "CategoryId", hide: true }, //
  { field: "ProductId", editable: false , hide: true },
  { field: "CategoryName" , editable: false  , flex: 2, minWidth: 200 },
  { field: "ParameterName", headerName: "Parameter"  , flex: 2, minWidth: 200, editable: false, },
  { field: "Unit" , editable: false, },
  { field: "Limits", editable: false,  },
  { field: "Result", editable: true, 
   },

    {
      field: "IsActive",
      editable: true,
       cellEditor: "agCheckboxCellEditor",
       cellRenderer: "agCheckboxCellRenderer",
    },
{
    field: "IsPassed",
    headerName: "Status",
    editable: true,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["Pass", "Fail"],
    },
    valueGetter: (params:any) => {
      // console.log('Full params:', params);
      // console.log('params.data:', params.data);
      // console.log('params.data.IsPassed:', params.data.IsPassed);
      // console.log('All data keys:', Object.keys(params.data));
      
      // Check what field name actually exists
      // Your field might be named differently like 'isPassed', 'passed', etc.
      return params.data.IsPassed === true ? "Pass" : "Fail";
    },
    valueSetter: (params:any) => {
     // console.log('Setting new value:', params.newValue);
      params.data.IsPassed = params.newValue === "Pass" ? true : false;
     // console.log('Data after set:', params.data);
      return true;
    }
,
     cellStyle: (params :any) => {
        const isPassed = params.data.IsPassed === true;
        return {
          backgroundColor: isPassed ? '#d4edda' : '#f8d7da',
          color: isPassed ? '#155724' : '#721c24',
          fontWeight: 'bold',
          cursor: 'pointer'
        };
      }
  },
  {
  headerName: "Actions",
  minWidth: 100,
  colId: "action",
   pinned: "right" as const, 
  editable: false,

  cellRenderer: (params: any) => (
    <div className="flex gap-2">

        {/* UPDATE
       <button  onClick={(e) => {
           e.stopPropagation();
           updateRow(params.data)
           }
           }

        className="inline-flex items-center p-1 rounded hover:bg-gray-100 mr-2" title="Edit" >
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0L15.13 4.9l3.75 3.75 1.83-1.61z"/></svg>
         </button> */}


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
  <div className="flex flex-col gap-2 lg:flex-row lg:items-center justify-between">
<div > 
    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 justify-end">
      Typical Analysis
    </h4>
    </div>
   
<div className="flex flex-col gap-2 lg:flex-row lg:items-center"> 
{
  rowData.length ==0 ? (
    <button
      onClick={addRow}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
      Generate Parameters
    </button>):""

    }
    {Array.isArray(rowData) ? (
  rowData.length > 0 ? (
    <> 

    {[3, 1].includes(Number(RoleId))?(
      <button  
      onClick={Verified}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
     Verified
    </button>):""
}

{  details?.coa.CheckedBy!==null && [12, 1].includes(Number(RoleId))?( 
  
      <button 
      onClick={Approved}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
    Approved
    </button>):""

}

    <button
      onClick={refreshrowRengenerate}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
    Refresh 
    </button>
    

      <button
      onClick={viewReport}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
    Report View 
    </button>
    
    </>):""):""

    }</div>
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
      onCellValueChanged={onCellValueChanged}
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
        Delete QA Test Result 
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
         


  onClick={() =>
  selectedProductAnalysis != null &&
  deleteRow(selectedProductAnalysis)
  }

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
