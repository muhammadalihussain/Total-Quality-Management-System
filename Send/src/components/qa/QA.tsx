"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import { AgGridTable } from "@/components/ui/AgGridTable/AgGridTable";
import { ColDef } from "ag-grid-community";
import { useModal } from "@/hooks/useModal";
import axios from "axios";
import ViewDetails from '@/components/qa/ViewDetails';
import Button from "@/components/ui/button/Button";
import CreateCOAModal from '@/components/qa/CreateCOAModal';
import toast from 'react-hot-toast';
import QADetails from "@/components/qa/QADetails";
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
  Plus
} from "lucide-react";

export default function QA() {
  const router = useRouter();

  //---------------------------------------
  // STATE
  //---------------------------------------
  const [coa, setCOA] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  const [totalRecords, setTotalRecords] = useState(0);

  const [dataStatusRecords, setDataStatusRecords] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  
 const [refreshGrid, setrefreshGrid] = useState('');
 const [selectedCOAID, setSelectedCOAID] =useState('')

const [isOpenView, setIsOpenView] = useState(false);
  const [Id, setID] = useState<number | null>(null);

  //---------------------------------------
  // LOAD DATA
  //---------------------------------------
  const loadData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/qa?search=${searchText.trim()}

        &status=${status.trim()}
        &page=${page}
        &pageSize=${pageSize}`
      );

      const data = await res.json();

      setCOA(data.data || []);
      setTotalRecords(data.total || 0);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchText, status, page,refreshGrid]);
  


  useEffect(() => {
    const fetchData = async () => {
      const res1 = await axios.get(`/api/dynamics?type=status`);

      setDataStatusRecords(res1.data.result.recordset);
    };

    fetchData();
  }, []);



    // UPDATE
  const updateRow = async (row: any) => {

     setEditing(row);
     setSelectedCOAID(row.Id);
     openModal();
  };

  //---------------------------------------
  // GRID READY
  //---------------------------------------
  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  //---------------------------------------
  // STATUS COLORS
  //---------------------------------------
  const statusColors: any = {
    OPEN: {
      backgroundColor: "#dbeafe",
      color: "#1d4ed8",
    },

    ACCEPTED: {
      backgroundColor: "#dcfce7",
      color: "#15803d",
    },

    IN_PROGRESS: {
      backgroundColor: "#fef9c3",
      color: "#a16207",
    },

    CHECKED: {
      backgroundColor: "#ccfbf1",
      color: "#0f766e",
    },

    CREATED: {
      backgroundColor: "#e0f2fe",
      color: "#0369a1",
    },

    CLOSED: {
      backgroundColor: "#ede9fe",
      color: "#6d28d9",
    },

    REJECTED: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
    },
      APPROVED: {
      backgroundColor: "#dbeafe",
      color: "#6d28d9",
    },


  };

  //---------------------------------------
  // GRID COLUMNS
  //---------------------------------------
  const columns: ColDef[] = [

    {
      field: "SalesId",
      headerName: "SalesID",
      width: 100,
      pinned: "left",
      cellStyle: {
        fontWeight: "600",
      },
    },

    {
      field: "ItemId",
      headerName: "ItemId",
      width: 60,
    },


    {
      field: "ItemName",
      headerName: "Item Name",
      width: 260,
    },

    {
      field: "StatusName",
      headerName: "Status",
      width: 60,

      cellStyle: (params) => {
        return {
          ...statusColors[params.value],
          fontWeight: "600",

          textAlign: "center",
        };
      },
    },

    {
      field: "ProductionDate",
      headerName: "Production Date",
      width: 150,

      valueFormatter: (params) =>
        params.value
          ? new Date(params.value).toLocaleDateString()
          : "-",
    },



    {
      headerName: "Action",
      colId: "action",
      pinned: "right",
      width: 100,

      cellRenderer: (params: any) => (
        <div  className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
               setIsOpenView(true);
              setID(params.data.Id)
             
             // router.push(`/qa/${params.data.Id}`);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-blue-100"
            title="Details"
          >
             <ExternalLink className="text-blue-600" size={18}  />
          
          </button>
           <button disabled={params.data.Status != 1}
            title="Delete"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition-all hover:scale-105 hover:bg-red-100"
                          >
            <Trash2 className="h-4 w-4" />
                          </button>

{ /*
           <button

        disabled={params.data.Status != 1}

           onClick={(e) => {
           e.stopPropagation();
           updateRow(params.data)
           }
           }

                      className={`inline-flex items-center p-1 rounded
    ${
      params.data.Status != 1
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "hover:bg-gray-100 text-blue-600"
    }`}title="Edit" >
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0L15.13 4.9l3.75 3.75 1.83-1.61z"/></svg>
         </button>



            <button
            onClick={(e) => {
              e.stopPropagation();
             // setID(params.data.Id)
              //setIsOpenView(true);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-blue-100"
            title="Details"
          >
            <ExternalLink className="text-blue-600" size={18}  />
          </button>*/}
        </div>
      ),
    },
  ];

  //---------------------------------------
  // LOADING
  //---------------------------------------
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>

          <p className="text-sm font-medium text-gray-500">
            Loading COA records...
          </p>
        </div>
      </div>
    );
  }



  //---------------------------------------
  // RENDER
  //---------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">
             Certification Of Analysis (COA)
            </h1>

           
          </div>

          {/* FILTERS */}
          <div className="flex flex-col gap-3 md:flex-row">
            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search COA..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPage(1);
                }}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 md:w-80"
              />
            </div>

            {/* STATUS */}
            <div className="relative">
              <Filter className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 md:w-60"
              >
                <option value="">All Status</option>

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
            </div>
          </div>

            <Button
            onClick={() => {
    openModal();
    setEditing(null);
    setID(null)
    setSelectedCOAID(null);
    setrefreshGrid(null);
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow"
          >
            + Add  Test
          </Button>
        </div>


             {/* MODAL */}
      <QADetails
       isOpen={isOpenView}
       onClose={() => {
       setIsOpenView(false);
       setID(null);
  }}
       Id={Id}

      />


   <CreateCOAModal
       isOpen={isOpen}
       onClose={closeModal}
       editingData={editing}
       Id={selectedCOAID}
       setrefreshGrid={setrefreshGrid}
       onSuccess={() => {
       closeModal();
        toast.success("COA created successfully!");
      }}
        />


        {/* GRID */}
        {!coa ? (
          <div>Loading...</div>
        ) : coa.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white/80 p-16 text-center shadow-sm">
            <ClipboardCheck className="mx-auto mb-4 h-14 w-14 text-gray-300" />

            <h3 className="text-xl font-semibold text-gray-700">
              No COA Records Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing search or filter criteria.
            </p>
          </div>
        ) : (
          <ComponentCard title="">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
              {/* TABLE */}
              <div className="p-4">
                <AgGridTable
                  onGridReady={onGridReady}
                  columns={columns}
                  data={coa}
                  height="600px"
                  pagination={false}
                />
              </div>

              {/* FOOTER */}
              <div className="flex flex-col gap-4 border-t border-gray-100 bg-gray-50 px-6 py-5 md:flex-row md:items-center md:justify-between">
                {/* RECORDS */}
                <div className="text-sm text-gray-600">
                  Showing page{" "}
                  <span className="font-bold text-gray-800">
                    {page}
                  </span>{" "}
                  • Total Records:{" "}
                  <span className="font-bold text-blue-600">
                    {totalRecords}
                  </span>
                </div>

                {/* PAGINATION */}
                <div className="flex items-center gap-3">
                  {/* PREVIOUS */}
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  {/* PAGE */}
                  <div className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md">
                    {page}
                  </div>

                  {/* NEXT */}
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page * pageSize >= totalRecords}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>



          </ComponentCard>
        )}
      </div>
    </div>
  );
}