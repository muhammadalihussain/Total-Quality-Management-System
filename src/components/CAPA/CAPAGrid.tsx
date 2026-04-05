// app/components/CAPAGrid.tsx
/*
'use client';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import { useModal } from "@/hooks/useModal";
import { Plus, RefreshCw, Eye, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import CreateCAPAModal from './CreateCAPAModal';
import CAPADetailsModal from './CAPADetailsModal';

interface CAPA {
  CAPAID: string;
  Title: string;
  Description: string;
  CreatedByName: string;
  Department: string;
  Status: string;
  CreatedAt: string;
  FinalResult: string;
}

const CAPAGrid: React.FC = () => {
  const [rowData, setRowData] = useState<CAPA[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCAPA, setSelectedCAPA] = useState<CAPA | null>(null);
const { isOpen, openModal, closeModal } = useModal();
  const gridApiRef = useRef<GridApi | null>(null);

  const fetchCAPAs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/capa');
      const data = await response.json();
      setRowData(data);
    } catch (error) {
      toast.error('Failed to fetch CAPAs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCAPAs();
  }, []);

  const onGridReady = (params: GridReadyEvent) => {
    gridApiRef.current = params.api;
    params.api.sizeColumnsToFit();
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'OPEN': return 'bg-yellow-100 text-yellow-800';
      case 'READY_FOR_COA': return 'bg-blue-100 text-blue-800';
      case 'COA_PREPARED': return 'bg-purple-100 text-purple-800';
      case 'CLOSED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultIcon = (result: string) => {
    if (result === 'PASS') {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (result === 'FAIL') {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    return null;
  };

  const defaultColDef = { editable: true, minWidth: 140, sortable: true, flex: 1, resizable: true, filter: true };

  const columnDefs: ColDef[] = [
    {
      field: 'CAPAID',
      headerName: 'CAPA ID',
      width: 120,
      pinned: 'left',
      cellStyle: { fontWeight: 'bold' }
    },
    { field: 'Title', headerName: 'Title', width: 250, flex: 1 },
    { field: 'Description', headerName: 'Description', width: 300, flex: 1 },
    { field: 'CreatedByName', headerName: 'Created By', width: 150 },
    { field: 'Department', headerName: 'Department', width: 150 },
    {
      field: 'Status',
      headerName: 'Status',
      width: 150,
      cellRenderer: (params: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(params.value)}`}>
          {params.value}
        </span>
      )
    },
    {
      field: 'CreatedAt',
      headerName: 'Created Date',
      width: 180,
      valueFormatter: (params: any) => new Date(params.value).toLocaleString()
    },
    {
      field: 'FinalResult',
      headerName: 'Result',
      width: 100,
      cellRenderer: (params: any) => (
        <div className="flex justify-center">
          {getResultIcon(params.value)}
        </div>
      )
    },
    {
      headerName: 'Actions',
      width: 120,
      pinned: 'right',
      cellRenderer: (params: any) => (
        <button
          onClick={() => {
            setSelectedCAPA(params.data);
            setShowDetailsModal(true);
          }}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <Eye className="w-4 h-4" /> View
        </button>
      )
    }
  ];

  return (
 <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>

     <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
      CAPA Management System
    </h4>

          <p className="text-gray-600 mt-1">Track and manage Corrective and Preventive Actions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchCAPAs}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
         <button
      onClick={openModal}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      <Plus className="w-4 h-4" /> Create CAPA
    </button>
        </div>
      </div>
<br/>
      <div style={{ width: "100%",  height: "auto" }}>
  <div className="ag-theme-alpine" style={{ width: "100%", height: "auto" }}>
        <AgGridReact
        theme="legacy"
       domLayout="autoHeight"
          rowData={rowData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          pagination={true}
        defaultColDef={defaultColDef}
      rowHeight={28}
      headerHeight={32}
          paginationPageSize={20}
          loading={loading}
          animateRows={true}

        />
      </div>
      </div>

        <CreateCAPAModal
        isOpen={isOpen}
      onClose={closeModal}
      onSuccess={() => {
        closeModal();
        fetchCAPAs();
        toast.success("CAPA created successfully!");
      }}
        />


      {showDetailsModal && selectedCAPA && (
        <CAPADetailsModal
          capaId={selectedCAPA.CAPAID}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedCAPA(null);
            fetchCAPAs();
          }}
        />
      )}
    </div>
  );
};

export default CAPAGrid;