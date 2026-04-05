import { NextRequest, NextResponse } from 'next/server';
import { executeQueryWithMultipleResults } from '@/lib/dal/dbutils';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const roleId = searchParams.get('roleId');
        const departmentId = searchParams.get('departmentId');

        const results = await executeQueryWithMultipleResults('sp_GetDashboardData', {
            UserID: userId ? parseInt(userId) : null,
            RoleID: roleId ? parseInt(roleId) : null,
            DepartmentID: departmentId ? parseInt(departmentId) : null
        });

        const dashboardData = {
            totalCAPAs: results[0]?.[0]?.TotalCAPAs || 0,
            capaByStatus: results[1] || [],
            openCAPAs: results[2]?.[0]?.OpenCAPAs || 0,
            closedCAPAs: results[3]?.[0]?.ClosedCAPAs || 0,
            overdueCAPAs: results[4]?.[0]?.OverdueCAPAs || 0,
            recentCAPAs: results[5] || [],
            pendingAssignments: results[6]?.[0]?.PendingAssignments || 0
        };

        return NextResponse.json({ success: true, data: dashboardData });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch dashboard data' },
            { status: 500 }
        );
    }
}