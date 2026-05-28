"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import { AgGridTable } from "@/components/ui/AgGridTable/AgGridTable";
import { ColDef } from "ag-grid-community";
import { useModal } from "@/hooks/useModal";
import axios from "axios";

import {
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function RootCauseList() {
  const router = useRouter();

  //---------------------------------------
  // STATE
  //---------------------------------------
  const [capas, setCapas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  const [totalRecords, setTotalRecords] = useState(0);

  const [dataStatusRecords, setDataStatusRecords] = useState<any[]>([]);

  const { isOpen, openModal, closeModal } = useModal();

  //---------------------------------------
  // LOAD DATA
  //---------------------------------------
  const loadData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/assignuser?search=${searchText.trim()}
        &UserID=${localStorage.getItem("UserID")?.trim()}
        &status=${status.trim()}
        &page=${page}
        &pageSize=${pageSize}`
      );

      const data = await res.json();

      setCapas(data.data || []);
      setTotalRecords(data.total || 0);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchText, status, page]);

  //---------------------------------------
  // STATUS DROPDOWN
  //---------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const res1 = await axios.get(`/api/dynamics?type=status`);

      setDataStatusRecords(res1.data.result.recordset);
    };

    fetchData();
  }, []);

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

    READY_FOR_QC: {
      backgroundColor: "#ccfbf1",
      color: "#0f766e",
    },

    READY_FOR_COA: {
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
  };

  //---------------------------------------
  // GRID COLUMNS
  //---------------------------------------
  const columns: ColDef[] = [
    {
      field: "CAPA_Code",
      headerName: "CID",
      width: 100,
      pinned: "left",
      cellStyle: {
        fontWeight: "600",
      },
    },

    {
      field: "Customer",
      headerName: "Customer",
      width: 220,
    },

    {
      field: "StatusId",
      hide: true,
    },

    {
      field: "ItemName",
      headerName: "Item Name",
      width: 260,
    },

    {
      field: "Status",
      headerName: "Status",
      width: 140,

      cellStyle: (params) => {
        return {
          ...statusColors[params.value],
          fontWeight: "600",
          borderRadius: "20px",
          textAlign: "center",
        };
      },
    },

    {
      field: "TargetDate",
      headerName: "Target Date",
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
        <div className="flex items-center justify-center h-full">
          <button
            onClick={(e) => {
              e.stopPropagation();

              router.push(`/rootcause/${params.data.CAPAID}`);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-blue-100"
            title="View"
          >
            <Eye className="h-5 w-5" />
          </button>
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
            Loading CAPA records...
          </p>
        </div>
      </div>
    );
  }

  //---------------------------------------
  // COUNTS
  //---------------------------------------
  const openCount = capas.filter(
    (x) => x.Status === "OPEN"
  ).length;

  const progressCount = capas.filter(
    (x) => x.Status === "IN_PROGRESS"
  ).length;

  const closedCount = capas.filter(
    (x) => x.Status === "CLOSED"
  ).length;

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
              Corrective & Preventive Action
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage CAPA records, root causes and corrective actions.
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-col gap-3 md:flex-row">
            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search CAPA..."
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
        </div>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* TOTAL */}
          <div className="rounded-3xl border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
                <ClipboardCheck className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total Records
                </p>

                <h3 className="text-3xl font-bold text-gray-800">
                  {totalRecords}
                </h3>
              </div>
            </div>
          </div>

          {/* OPEN */}
          <div className="rounded-3xl border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-yellow-100 p-4 text-yellow-600">
                <AlertTriangle className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Open Cases
                </p>

                <h3 className="text-3xl font-bold text-gray-800">
                  {openCount}
                </h3>
              </div>
            </div>
          </div>

          {/* IN PROGRESS */}
          <div className="rounded-3xl border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-600">
                <Clock3 className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  In Progress
                </p>

                <h3 className="text-3xl font-bold text-gray-800">
                  {progressCount}
                </h3>
              </div>
            </div>
          </div>

          {/* CLOSED */}
          <div className="rounded-3xl border border-white/50 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-green-100 p-4 text-green-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Closed Cases
                </p>

                <h3 className="text-3xl font-bold text-gray-800">
                  {closedCount}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* GRID */}
        {!capas ? (
          <div>Loading...</div>
        ) : capas.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white/80 p-16 text-center shadow-sm">
            <ClipboardCheck className="mx-auto mb-4 h-14 w-14 text-gray-300" />

            <h3 className="text-xl font-semibold text-gray-700">
              No CAPA Records Found
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
                  data={capas}
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