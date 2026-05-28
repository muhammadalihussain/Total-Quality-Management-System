'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ComponentCard from "@/components/common/ComponentCard";

import { AgGridTable } from '@/components/ui/AgGridTable/AgGridTable';
import { ColDef } from 'ag-grid-community';

interface DashboardData {
    totalCAPAs: number;
    openCAPAs: number;
    closedCAPAs: number;
    overdueCAPAs: number;
    recentCAPAs: any[];
    pendingAssignments: number;
}

export default function Dashboard() {
    const router = useRouter();
    const [data, setData] = useState<DashboardData>({
        totalCAPAs: 0,
        openCAPAs: 0,
        closedCAPAs: 0,
        overdueCAPAs: 0,
        recentCAPAs: [],
        pendingAssignments: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch('/api/dashboard?userId=1');
            const result = await response.json();
            if (result.success) {
                setData(result.data);
            }
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const columns: ColDef[] = [
        { field: 'CAPA_Code', headerName: 'CAPA ID', width: 120 },
        { field: 'Title', headerName: 'Title', width: 250 },
        { field: 'DepartmentName', headerName: 'Department', width: 150 },
        { field: 'CreatedByName', headerName: 'Created By', width: 150 },
        {
            field: 'Status',
            headerName: 'Status',
            width: 130,
            cellStyle: (params) => {
                const colors: any = {
                    OPEN: { backgroundColor: '#fff3cd', color: '#856404' },
                    IN_PROGRESS: { backgroundColor: '#cfe2ff', color: '#084298' },
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
        }
    ];

    const stats = [
        { title: 'Total CAPAs', value: data.totalCAPAs, color: 'blue', icon: '📋' },
        { title: 'Open CAPAs', value: data.openCAPAs, color: 'yellow', icon: '🟡' },
        { title: 'Closed CAPAs', value: data.closedCAPAs, color: 'green', icon: '✅' },
        { title: 'Overdue', value: data.overdueCAPAs, color: 'red', icon: '⚠️' },
        { title: 'Pending Assignments', value: data.pendingAssignments, color: 'purple', icon: '📌' }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <ComponentCard title='' key={index} className="hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className="text-3xl">{stat.icon}</div>
                            </div>
                        </ComponentCard>
                    ))}
                </div>

                {/* Recent CAPAs Table */}
                <ComponentCard title="Recent CAPAs">
                    <AgGridTable
                        columns={columns}
                        data={data.recentCAPAs}
                        onRowClicked={(row) => router.push(`/capa/${row.CAPAID}`)}
                        height="400px"
                    />
                </ComponentCard>
            </div>
        </div>
    );
}