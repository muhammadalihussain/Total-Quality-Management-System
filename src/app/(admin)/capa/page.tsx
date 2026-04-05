'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { AgGridTable } from '@/components/ui/AgGridTable/AgGridTable';
import { ColDef } from 'ag-grid-community';

interface CAPA {
    CAPAID: number;
    CAPA_Code: string;
    Title: string;
    Description: string;
    Status: string;
    Priority: string;
    CreatedAt: string;
    CreatedByName: string;
    DepartmentName: string;
}

export default function CAPAList() {
    const router = useRouter();
   // const [capas, setCapas] = useState<CAPA[]>([]);
   const [capas, setCapas] = useState<any[]>([]);
    //   const [capas, setCapas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>('');

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



const columns: ColDef[] = [
        { field: 'CAPA_Code', headerName: 'CAPA ID', width: 120, pinned: 'left' },
        { field: 'Title', headerName: 'Title', width: 250 },
        { field: 'DepartmentName', headerName: 'Department', width: 150 },
        { field: 'CreatedByName', headerName: 'Created By', width: 150 },
        {
            field: 'Priority',
            headerName: 'Priority',
            width: 120,
            cellStyle: (params) => {
                const colors: any = {
                    HIGH: { backgroundColor: '#f8d7da', color: '#721c24' },
                    MEDIUM: { backgroundColor: '#fff3cd', color: '#856404' },
                    LOW: { backgroundColor: '#d1e7dd', color: '#0f5132' }
                };
                return colors[params.value] || {};
            }
        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 130,
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
        {
            field: 'CreatedAt',
            headerName: 'Created Date',
            width: 180,
            valueFormatter: (params) => new Date(params.value).toLocaleString()
        },
        {
            field: 'TargetDate',
            headerName: 'Target Date',
            width: 120,
            valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '-'
        }
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
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">CAPA Management</h1>
                    <div className="flex gap-3">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="OPEN">Open</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="READY_FOR_QC">Ready for QC</option>
                            <option value="READY_FOR_COA">Ready for COA</option>
                            <option value="CLOSED">Closed</option>
                        </select>
                        <Button onClick={() => router.push('/capa/create')}>
                            + Create CAPA
                        </Button>
                    </div>
                </div>

             <ComponentCard title='CAPA Management'>

                {!capas ? (
  <div>Loading...</div>
) : capas.length === 0 ? (
  <div>No data found</div>
) : (


                    <AgGridTable
                        columns={columns}
                        data={capas}
                        onRowClicked={(row) => router.push(`/capa/${row.CAPAID}`)}
                        height="600px"
                        paginationPageSize={20}
                    /> )}
                </ComponentCard>
            </div>
        </div>
    );
     }
}