'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { AgGridTable } from '@/components/ui/AgGridTable/AgGridTable';
import { ColDef } from 'ag-grid-community';
import AssignCAPAModal from '@/components/CAPA/AssignCAPAModal';
import {  AgGridReact } from 'ag-grid-react';
import axios from "axios";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import AssignUserModal from '@/components/CAPA/AssignUserModal';

interface CAPADetails {
    capa: any;
    rootCauses: any[];
    qcTests: any[];
    coa: any;
    coaTests: any[];
    timeline: any[];
}

export default function CAPADetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [details, setDetails] = useState<CAPADetails | null>(null);
    const [activeTab, setActiveTab] = useState('assign-user');
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openModalAssign, setOpenModalAssign] = useState(false);
    const [selectedCAPA, setSelectedCAPA] = useState<number | null>(null);
    const [refreshGrid, setrefreshGrid] = useState(false);
    const [users, setUsers] = useState([]);
    const [gridApi, setGridApi] = useState<any>(null);
    const [refreshAssignGrid, setrefreshAssignGrid] = useState(false);
     const [showDelete, setShowDelete] = useState(false);


    const handleOpen = (e: any, capaId: number) => {
    e.stopPropagation(); // prevent row click
    setSelectedCAPA(capaId);

    setrefreshGrid(false);
    setOpenModal(true);
  };


   const handleOpenAssing = (e: any, capaId: number) => {
    e.stopPropagation(); // prevent row click

    setrefreshGrid(false);
    setrefreshAssignGrid(false);
    setOpenModalAssign(true);
  };

  async function fetchCAPAs() {
    try {

    const res =   await axios.post("/api/capa/assign/getcapausersbycapaid", {
    CAPAID:  params.id
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
    CAPAID: params.id,
    AssignmentID: id
  })
});

    setrefreshGrid(false);
    setrefreshAssignGrid(false);
    fetchCAPAs();
    setShowDelete(false)
  };

    useEffect(() => {
        fetchDetails();
    }, [params.id,refreshGrid]);


    const columnDefsAssign: ColDef<any>[] = [

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



    
const onGridReady = (params:any) => {
setGridApi(params.api);
  params.api.sizeColumnsToFit(); // fit to screen
};
const defaultColDef = { editable: true, minWidth: 140, sortable: true, flex: 1, resizable: true, filter: true };
 

    const fetchDetails = async () => {
        try {
            const response = await fetch(`/api/capa?id=${params.id}`);
            const result = await response.json();
            if (result.success && result.data) {
                const timelineRes = await fetch(`/api/timeline?capaId=${params.id}`);
                const timelineResult = await timelineRes.json();

                setDetails({
                    capa: result.data[0]?.[0],
                    rootCauses: result.data[1] || [],
                    qcTests: result.data[2] || [],
                    coa: result.data[3]?.[0],
                    coaTests: result.data[4] || [],
                    timeline: timelineResult.success ? timelineResult.data : []
                });
            }
        } catch (error) {
            console.error('Error fetching details:', error);
        } finally {
            setLoading(false);
        }
    };

    const rootCauseColumns: ColDef[] = [
        { field: 'RootCauseCode', headerName: 'RC ID', width: 100 },
        { field: 'RootCauseTitle', headerName: 'Root Cause', width: 200 },
        { field: 'Category', headerName: 'Category', width: 120 },
        { field: 'ActionTitle', headerName: 'Action', width: 200 },
        { field: 'ActionType', headerName: 'Type', width: 100 },
        { field: 'AssignedToName', headerName: 'Assigned To', width: 150 },
        {
            field: 'ActionTaken',
            headerName: 'Taken',
            width: 80,
            cellRenderer: (params: any) => params.value ? '✅' : '❌'
        },
        {
            field: 'IsEffective',
            headerName: 'Effective',
            width: 80,
            cellRenderer: (params: any) => params.value ? '✅' : '❌'
        },
        { field: 'AssignmentStatus', headerName: 'Status', width: 120 }
    ];

    const qcTestColumns: ColDef[] = [
        { field: 'TestCode', headerName: 'Test ID', width: 100 },
        { field: 'TestName', headerName: 'Test Name', width: 200 },
        { field: 'TestParameters', headerName: 'Parameters', width: 150 },
        { field: 'ExpectedResult', headerName: 'Expected', width: 150 },
        { field: 'ActualResult', headerName: 'Actual', width: 150 },
        {
            field: 'IsPassed',
            headerName: 'Result',
            width: 100,
            cellRenderer: (params: any) => (
                <span className={params.value ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                    {params.value ? 'PASS' : 'FAIL'}
                </span>
            )
        },
        { field: 'TestedByName', headerName: 'Tested By', width: 150 }
    ];

    const timelineColumns: ColDef[] = [
        {
            field: 'EventDate',
            headerName: 'Date & Time',
            width: 180,
            valueFormatter: (params) => new Date(params.value).toLocaleString()
        },
        { field: 'EventType', headerName: 'Event', width: 150 },
        { field: 'EventDescription', headerName: 'Description', width: 400 },
        { field: 'PerformedBy', headerName: 'Performed By', width: 150 },
        { field: 'Role', headerName: 'Role', width: 120 }
    ];

    const getStatusColor = (status: string) => {
        const colors: any = {
            OPEN: 'bg-blue-100 text-blue-900',
            IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
             ACCEPTED: 'bg-green-100 text-yellow-800',
            READY_FOR_QC: 'bg-green-100 text-green-800',
            READY_FOR_COA: 'bg-purple-100 text-purple-800',
            CLOSED: 'bg-gray-100 text-gray-800',
            REJECTED: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };
    

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!details?.capa) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">CAPA not found</p>
                <Button onClick={() => router.push('/capa')} className="mt-4">
                    Back to List
                </Button>
            </div>
        );
    }

    return (
        <div className="p-1 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                 

                {/* CAPA Header Card */}
                <ComponentCard title={details.capa.CAPA_Code} >

                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">

                                <h1 className="text-2xl font-bold text-gray-900">
                                   SalesOrder No:{details.capa.SalesId}
                                </h1>

                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(details.capa.Status)}`}>
                                    {details.capa.Status}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    details.capa.Priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                    details.capa.Priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {details.capa.Priority}
                                </span>

                                {   
                                
                                details.capa.StatusId !=7 && (
                             <span
  className="px-4 py-2 cursor-pointer rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm inline-block"
  onClick={(e) => {
    handleOpen(e, Number(params.id));
  }}
>
  Take Action ( Accept / Reject )
</span>
)}
  <a href='#'  onClick={() => router.back()}>
                        ← Back
                    </a>


 {/* Popup Render */}
      {
        openModal && (
        <AssignCAPAModal
          capaId={selectedCAPA}
          onClose={() => setOpenModal(false)}
          setrefreshGrid={setrefreshGrid}
          StatusId ={details.capa.StatusId}
          TargetDate={ details.capa.TargetDate}
          ClosureDate ={details.capa.ClosureDate}
        />
      )}

   </div>
  <h2 className="text-lg text-gray-700 font-medium">
                  {details.capa.Title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div><span className="font-semibold">Customer:</span> {details.capa.Customer}</div>
                  <div><span className="font-semibold">Item ID:</span> {details.capa.ItemId}</div>
                  <div><span className="font-semibold">Item Name:</span> {details.capa.ItemName}</div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Complaint Detail</p>
                  <p className="text-gray-700">{details.capa.Description}</p>
                </div>

                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-500">Reject Remarks</p>
                  <p className="text-gray-700">{details.capa.RejectRemarks || '-'}</p>
                </div>

              </div>

                        {/* RIGHT SIDE */}
              <div className="w-full md:w-64 bg-white p-4 rounded-xl shadow border space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Created By</p>
                  <p className="font-semibold">{details.capa.CreatedByName}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="font-semibold">{details.capa.DepartmentName}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm">{new Date(details.capa.CreatedAt).toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Target</p>
                  <p className="text-sm">
                    {details.capa.TargetDate
                      ? new Date(details.capa.TargetDate).toLocaleDateString()
                      : '-'}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Closure</p>
                  <p className="text-sm">
                    {details.capa.ClosureDate
                      ? new Date(details.capa.ClosureDate).toLocaleDateString()
                      : '-'}
                  </p>
                </div>
              </div>

            </div>

                </ComponentCard>

                {/* Tabs */}


   { !openModal && (
                 <>
                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex gap-4">
                        {['assign-user', 'root-causes', 'qc-tests', 'coa', 'timeline'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                                    activeTab === tab
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.replace('-', ' ')}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div>
                    {  activeTab === 'assign-user' && (
                        <div className="grid grid-cols-2 gap-6">
                          



                            
<ComponentCard title="">
{  details.capa.StatusId==6  ? (
        <div >
  <button
   onClick={(e) => handleOpenAssing(e, Number(params.id))}
    className={"px-3 flex justify-left gap-2  py-1 rounded  bg-blue-600 text-white"}
  >
    Assign User
  </button>
  </div>) : ""
  }

                                 {/* Popup Render */}
                                      {
                                        openModalAssign && (
                                        <AssignUserModal
                                          capaId={params.id}
                                          onClose={() => setOpenModalAssign(false)}
                                          setrefreshGrid={setrefreshGrid}
                                           setrefreshAssignGrid={setrefreshAssignGrid}
                                
                                        />
                                      )}

                                    {users.length === 0 ? (
  <div>No Data Found</div>
) : (


 <div style={{ width: "100%", height: "300px" }}>
    <div className="ag-theme-alpine w-full h-full">
                            <AgGridReact
                            rowSelection="multiple"
                             
                             theme="legacy"
                              domLayout="autoHeight"
                                onGridReady={onGridReady}
                                columnDefs={columnDefsAssign}
                                defaultColDef={defaultColDef}
                                pagination={true}
                                rowHeight={28}
                                headerHeight={32}
                                rowData={users}
                                paginationPageSize={5}
                                
                            />
                            </div>
                            </div>
)}

                                {/* <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">CAPA Code</p>
                                        <p className="font-medium">{details.capa.CAPA_Code}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Description</p>
                                        <p>{details.capa.Description}</p>
                                    </div>
                                </div> */}
                            </ComponentCard>
                            <ComponentCard title="Summary">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Root Causes</p>
                                        <p className="text-2xl font-bold">{details.rootCauses.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Actions</p>
                                        <p className="text-2xl font-bold">
                                            {details.rootCauses.filter(rc => rc.ActionID).length}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">QC Tests Performed</p>
                                        <p className="text-2xl font-bold">{details.qcTests.length}</p>
                                    </div>
                                </div>
                            </ComponentCard>
                        </div>
                    )}

                    {activeTab === 'root-causes' && (
                        <ComponentCard title="Root Causes & Actions">
                            <AgGridTable
                                columns={rootCauseColumns}
                                data={details.rootCauses}
                                height="500px"
                            />
                        </ComponentCard>
                    )}

                    {activeTab === 'qc-tests' && (
                        <ComponentCard title="QC Test Results">
                            <AgGridTable
                                columns={qcTestColumns}
                                data={details.qcTests}
                                height="500px"
                            />
                        </ComponentCard>
                    )}

                    {activeTab === 'coa' && details.coa && (
                        <ComponentCard title="Certificate of Analysis">
                            <div className="mb-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">COA Code</p>
                                        <p className="font-medium text-lg">{details.coa.COA_Code}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Status</p>
                                        <p className={`font-medium ${
                                            details.coa.COA_Status === 'APPROVED' ? 'text-green-600' : 'text-yellow-600'
                                        }`}>
                                            {details.coa.COA_Status}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Result</p>
                                        <p className={`font-bold text-xl ${
                                            details.coa.Result === 'PASS' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {details.coa.Result}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Valid Until</p>
                                        <p>{details.coa.ValidUntil ? new Date(details.coa.ValidUntil).toLocaleDateString() : '-'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-2">Approval Chain</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Prepared By (QA)</p>
                                        <p className="font-medium">{details.coa.PreparedByName}</p>
                                        <p className="text-xs text-gray-400">{new Date(details.coa.PreparedAt).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Checked By (Manager)</p>
                                        <p className="font-medium">{details.coa.CheckedByName || '-'}</p>
                                        {details.coa.CheckedAt && (
                                            <p className="text-xs text-gray-400">{new Date(details.coa.CheckedAt).toLocaleString()}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Approved By (Head QA)</p>
                                        <p className="font-medium">{details.coa.ApprovedByName || '-'}</p>
                                        {details.coa.ApprovedAt && (
                                            <p className="text-xs text-gray-400">{new Date(details.coa.ApprovedAt).toLocaleString()}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ComponentCard>
                    )}

                    {activeTab === 'timeline' && (
                        <ComponentCard title="Workflow Timeline">
                            <AgGridTable
                                columns={timelineColumns}
                                data={details.timeline}
                                height="500px"
                            />
                        </ComponentCard>
                    )}
                </div>
                 </>) }
            </div>
        </div>

    );
}