'use client';


import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { AgGridTable } from '@/components/ui/AgGridTable/AgGridTable';
import { ColDef } from 'ag-grid-community';
import CreateCAPAModal from '@/components/CAPA/CreateCAPAModal';
import toast from 'react-hot-toast';
import { useModal } from "@/hooks/useModal";
import axios from 'axios';

export default function CAPAList() {
    const router = useRouter();
   // const [capas, setCapas] = useState<CAPA[]>([]);
   const [capas, setCapas] = useState<any[]>([]);
    //   const [capas, setCapas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>('');
    const { isOpen, openModal, closeModal } = useModal();
    const [showDelete, setShowDelete] = useState(false);
    const [selectedCAPAID, setSelectedCAPAID] =useState('')
    const [editing, setEditing] = useState<any | null>(null);


const [searchText, setSearchText] = useState("");
const [status, setStatus] = useState("");
const [page, setPage] = useState(1);
const [pageSize] = useState(20);


const [totalRecords, setTotalRecords] = useState(0);

const loadData = async () => {

  try {

    const res = await fetch(
      `/api/capa?search=${searchText.trim()}
       &status=${status.trim()}
      &page=${page}
      &pageSize=${pageSize}`
    );

    const data = await res.json();

    setCapas(data.data);
    setTotalRecords(data.total);
  setLoading(false);
  } catch (err) {
    console.log(err);
      setLoading(false);
  }
};

useEffect(() => {
  loadData();
}, [searchText, status, page]);

 // STATUS COUNTERS (🔥 NEW PART)
  // -------------------------
  const statusSummary = useMemo(() => {
    const summary: any = {
      OPEN: 0,
      ACCEPTED: 0,
      IN_PROGRESS: 0,
      READY_FOR_QC: 0,
      CLOSED: 0,
      REJECTED: 0,
      TOTAL: capas.length
    };

    capas.forEach((item) => {
      const key = item.Status?.toUpperCase();
      if (summary[key] !== undefined) {
        summary[key]++;
      }
    });

    return summary;
  }, [capas]);


const [dataStatusRecords, setDataStatusRecords] = useState<any[]>([]);
    useEffect(() => {
  
       const fetchData = async () => {
  
                const res1 = await axios.get(`/api/dynamics?type=status`);
               setDataStatusRecords( res1.data.result.recordset);
       }
  
      fetchData();
    }, []);
  

const onGridReady = (params:any) => {
  params.api.sizeColumnsToFit(); // fit to screen
};

  // DELETE
  const deleteRow = async (id: number) => {

 await fetch(`/api/capa/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})



    setShowDelete(false)
  };

    // UPDATE
  const updateRow = async (row: any) => {

     setEditing(row);
     setSelectedCAPAID(row.CAPAID);
     openModal();
  };

const columns: ColDef[] = [
        { field: 'CAPA_Code', headerName: 'CAPA ID', width: 60, pinned: 'left' },
      //  { field: 'DepartmentName', headerName: 'Department', width: 150 },
         { field: 'Customer', headerName: 'Customer', width: 200 },
       { field: "StatusId", hide: true },
          { field: 'ItemName', headerName: 'ItemName', width: 200 },
        { field: 'CreatedByName', headerName: 'Created By', width: 110 },


   /*     {
            field: 'Priority',
            headerName: 'Priority',
            width: 30,
            cellStyle: (params) => {
                const colors: any = {
                    HIGH: { backgroundColor: '#f8d7da', color: '#721c24' },
                    MEDIUM: { backgroundColor: '#fff3cd', color: '#856404' },
                    LOW: { backgroundColor: '#d1e7dd', color: '#0f5132' }
                };
                return colors[params.value] || {};
            }
        }, */
        {
            field: 'Status',
            headerName: 'Status',
           width: 80,  // Use width instead of minWidth for fixed small size
  minWidth: 60,  // Optional: set minimum if you want responsive behavior
  maxWidth: 100,

            cellStyle: (params) => {
              const colors: any = {
  OPEN: { backgroundColor: '#e3f2fd', color: '#0d47a1' },           // Light blue
  ACCEPTED: { backgroundColor: '#c8e6c9', color: '#1b5e20' },       // Light green
  IN_PROGRESS: { backgroundColor: '#fff9c4', color: '#f57f17' },    // Light yellow
  READY_FOR_QC: { backgroundColor: '#e0f2f1', color: '#004d40' },   // Light teal
  READY_FOR_COA: { backgroundColor: '#e1f5fe', color: '#01579b' },   // Light cyan
  CLOSED: { backgroundColor: '#f3e5f5', color: '#4a148c' },         // Light purple
  REJECTED: { backgroundColor: '#ffebee', color: '#b71c1c' }        // Light red
};
                return colors[params.value] || {};
            }
        },
     /*   {
            field: 'CreatedAt',
            headerName: 'Created Date',
            width: 100,
            valueFormatter: (params) => new Date(params.value).toLocaleString()
        }, */
        {
            field: 'TargetDate',
            headerName: 'Target Date',
            width: 100,
            valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '-'
        }
        ,

         {
  headerName: "Action",
  colId: "action",
  pinned: "right",
  editable: false,
  width: 80,  // Use width instead of minWidth for fixed small size
  minWidth: 120,  // Optional: set minimum if you want responsive behavior
  maxWidth: 200,  // Optional: cap the maximum width

  cellRenderer: (params: any) => (
    <div className="flex gap-2">

    <button
  onClick={(e) => {
    e.stopPropagation();

    router.push(`/capa/${params.data.CAPAID}`)

  }}
   className="inline-flex items-center p-2 rounded hover:bg-gray-100 text-blue-600"
  title="View"
>
   <svg width="22" height="22" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 6c-5 0-9 6-9 6s4 6 9 6 9-6 9-6-4-6-9-6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
    />
  </svg>
</button>

        {/* UPDATE */}


       <button

        disabled={params.data.StatusId != 1}

           onClick={(e) => {
           e.stopPropagation();
           updateRow(params.data)
           }
           }

                      className={`inline-flex items-center p-1 rounded
    ${
      params.data.StatusId != 1
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-100 text-blue-600"
    }`}title="Edit" >
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0L15.13 4.9l3.75 3.75 1.83-1.61z"/></svg>
         </button>




      {/* DELETE */}



<button
  disabled={params.data.StatusId != 1}
  onClick={(e) => {
    e.stopPropagation();

    deleteRow(params.data.CAPAID);
    setShowDelete(true);
  }}
  className={`inline-flex items-center p-1 rounded
    ${
      params.data.StatusId != 1
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-100 text-red-600"
    }`}
  title="Delete"
>
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
  </svg>
</button>

    </div>
  ),
},
    ];


    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>

            </div>
        );
    }

    else
    {

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
       <CreateCAPAModal
       isOpen={isOpen}
       onClose={closeModal}
       editingData={editing}
       capaID={selectedCAPAID}


       onSuccess={() => {
       closeModal();
      
        toast.success("CAPA created successfully!");
      }}
        />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Complain Management</h1>
                    <div className="flex gap-3">

                        {/* Search Textbox */}
 <input
    type="text"
    placeholder="Search CAPA..."
    value={searchText}
    onChange={(e) => {
      setSearchText(e.target.value);
      setPage(1);
    }}
    className="border border-gray-300 rounded-lg px-3 py-2 w-80
    focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
             

 <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="border border-gray-300 rounded-lg px-3 py-2 bg-white w-52
    focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
          <option value="" >Select All Status</option>
            {dataStatusRecords?.length > 0 ? (
              dataStatusRecords.map((id) => (
                <option key={id.Id} value={id.Id}>
                  {id.StatusName}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>

                        <Button  onClick={() => {
    openModal();
    setEditing(null);
    setSelectedCAPAID('');
  }}>
                            + Create
                        </Button>
                    </div>



                </div>

  {/* 🔥 STATUS DASHBOARD (NEW) */}
      <div className="grid grid-cols-6 gap-3 mb-4">

        <div className="p-3 bg-blue-100 rounded">OPEN: {statusSummary.OPEN}</div>
        <div className="p-3 bg-green-100 rounded">ACCEPTED: {statusSummary.ACCEPTED}</div>
        <div className="p-3 bg-yellow-100 rounded">IN PROGRESS: {statusSummary.IN_PROGRESS}</div>
        <div className="p-3 bg-teal-100 rounded">QC: {statusSummary.READY_FOR_QC}</div>
        <div className="p-3 bg-purple-100 rounded">CLOSED: {statusSummary.CLOSED}</div>
        <div className="p-3 bg-red-100 rounded">REJECTED: {statusSummary.REJECTED}</div>

      </div>

      <div className="p-3 bg-gray-200 rounded mb-4">
        TOTAL RECORDS: {totalRecords}
      </div>


             <ComponentCard title=''>

                {!capas ? (
  <div>Loading...</div>
) : capas.length === 0 ? (
  <div>No data found</div>
) : (


                    <AgGridTable
                        onGridReady={onGridReady}
                        columns={columns}
                        data={capas}

                        height="600px"
                        pagination={false}
                    /> )}

                    <div className="flex items-center justify-between mt-4">

  <div>
   
  </div>

  <div className="flex gap-2">

    <button
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Previous
    </button>

    <span className="px-4 py-2">
      Page {page}
    </span>

    <button
      onClick={() => setPage(page + 1)}
      disabled={page * pageSize >= totalRecords}
      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
    >
      Next
    </button>

  </div>

</div>
                </ComponentCard>
            </div>
        </div>
    );
     }
}