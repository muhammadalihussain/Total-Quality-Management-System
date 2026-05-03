'use client';

import { useEffect, useState } from 'react';
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




    useEffect(() => {


        fetchCAPAs();
    }, [filterStatus]);

    const fetchCAPAs = async () => {
    setLoading(true);

    try {
      const url = filterStatus
        ? `/api/capa?status=${filterStatus}`
        : '/api/capa';

      const response = await fetch(url);
      const result = await response.json();
      const data =
    
      result?.data ||            // normal
      [];

      if (Array.isArray(data)) {
      setCapas(data);
    } else {
      setCapas([]);
    }

    } catch (error) {
      console.error('Error fetching CAPAs:', error);
      setCapas([]);
    } finally {
      setLoading(false);
    }
  };
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



fetchCAPAs();

    setShowDelete(false)
  };

    // UPDATE
  const updateRow = async (row: any) => {

     setEditing(row);
     setSelectedCAPAID(row.CAPAID)
      openModal()


  };

const columns: ColDef[] = [
        { field: 'CAPA_Code', headerName: 'CAPA ID', width: 60, pinned: 'left' },
      //  { field: 'DepartmentName', headerName: 'Department', width: 150 },
       { field: 'Customer', headerName: 'Customer', width: 200 },
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
            width: 30,
            cellStyle: (params) => {
                const colors: any = {
                    OPEN: { backgroundColor: '#cfe2ff', color: '#084298' },
                    IN_PROGRESS: { backgroundColor: '#fff3cd', color: '#856404' },
                    READY_FOR_QC: { backgroundColor: '#d1e7dd', color: '#0f5132' },
                    READY_FOR_COA: { backgroundColor: '#cff4fc', color: '#055160' },
                    CLOSED: { backgroundColor: '#d1e7dd', color: '#0f5132' },
                    REJECTED: { backgroundColor: '#f8d7da', color: '#721c24' }
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
  headerName: "Actions",
  minWidth: 50,
  colId: "action",
  pinned: "right",
  editable: false,

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
       deleteRow(params.data.CAPAID);

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
       fetchCAPAs();
        toast.success("CAPA created successfully!");
      }}
        />
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">CAPA Management</h1>
                    <div className="flex gap-3">
                      

 <select
            key={"0"}
            name="StatusID"
            id="StatusID"
           value={filterStatus}
     onChange={(e) => setFilterStatus(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"

          >
          <option value="" disabled>Select Status</option>
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
                            + Create CAPA
                        </Button>
                    </div>



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
                        paginationPageSize={20}
                    /> )}
                </ComponentCard>
            </div>
        </div>
    );
     }
}