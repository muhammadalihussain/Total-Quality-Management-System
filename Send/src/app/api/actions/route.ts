import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/dal/dbutils';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { RootCauseID, ActionType, ActionTitle, ActionDescription, AssignedTo, DueDate, CreatedBy, Priority } = body;

        const result = await executeQuery('sp_AddAction', {
            RootCauseID,
            ActionType,
            ActionTitle,
            ActionDescription,
            AssignedTo,
            DueDate,
            CreatedBy,
            Priority: Priority || 'MEDIUM'
        });

        return NextResponse.json({ success: true, data: result[0] });
    } catch (error) {
        console.error('Error adding action:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to add action' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const rootCauseId = searchParams.get('rootCauseId');
        const assignedTo = searchParams.get('assignedTo');

        let query = `
            SELECT
                a.*,
                rc.RootCauseTitle,
                u_assigned.FullName as AssignedToName,
                u_created.FullName as CreatedByName
            FROM CAPAActions a
            INNER JOIN RootCauses rc ON a.RootCauseID = rc.RootCauseID
            LEFT JOIN Users u_assigned ON a.AssignedTo = u_assigned.UserID
            LEFT JOIN Users u_created ON a.CreatedBy = u_created.UserID
            WHERE 1=1
        `;
        const params: any = {};

        if (rootCauseId) {
            query += ` AND a.RootCauseID = @RootCauseID`;
            params.RootCauseID = parseInt(rootCauseId);
        }
        if (assignedTo) {
            query += ` AND a.AssignedTo = @AssignedTo`;
            params.AssignedTo = parseInt(assignedTo);
        }

        query += ` ORDER BY a.CreatedAt DESC`;

        const actions = await executeQuery(query, params);
        return NextResponse.json({ success: true, data: actions });
    } catch (error) {
        console.error('Error fetching actions:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch actions' },
            { status: 500 }
        );
    }
}