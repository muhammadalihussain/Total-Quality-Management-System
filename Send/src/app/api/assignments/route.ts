import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/dal/dbutils';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, ...data } = body;

        if (action === 'complete') {
            const { AssignmentID, ActionTaken, Remarks, CompletedBy } = data;
            const result = await executeQuery('sp_CompleteAction', {
                AssignmentID,
                ActionTaken,
                Remarks,
                CompletedBy
            });
            return NextResponse.json({ success: true, data: result[0] });
        }
        else if (action === 'effectiveness') {
            const { AssignmentID, IsEffective, Remarks, CheckedBy } = data;
            const result = await executeQuery('sp_MarkEffectiveness', {
                AssignmentID,
                IsEffective,
                Remarks,
                CheckedBy
            });
            return NextResponse.json({ success: true, data: result[0] });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Error processing assignment:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process assignment' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const assignedTo = searchParams.get('assignedTo');
        const status = searchParams.get('status');
        const capaId = searchParams.get('capaId');

        let query = `
            SELECT
                ass.*,
                c.CAPA_Code, c.Title as CAPATitle,
                rc.RootCauseTitle,
                a.ActionTitle, a.ActionType, a.ActionDescription,
                u_assigned.FullName as AssignedToName,
                u_assigned_by.FullName as AssignedByName,
                u_completed.FullName as CompletedByName,
                u_effectiveness.FullName as EffectivenessCheckedByName
            FROM CAPAAssignments ass
            INNER JOIN CAPA c ON ass.CAPAID = c.CAPAID
            INNER JOIN RootCauses rc ON ass.RootCauseID = rc.RootCauseID
            INNER JOIN CAPAActions a ON ass.ActionID = a.ActionID
            LEFT JOIN Users u_assigned ON ass.AssignedTo = u_assigned.UserID
            LEFT JOIN Users u_assigned_by ON ass.AssignedBy = u_assigned_by.UserID
            LEFT JOIN Users u_completed ON a.CompletedBy = u_completed.UserID
            LEFT JOIN Users u_effectiveness ON ass.EffectivenessCheckedBy = u_effectiveness.UserID
            WHERE 1=1
        `;
        const params: any = {};

        if (assignedTo) {
            query += ` AND ass.AssignedTo = @AssignedTo`;
            params.AssignedTo = parseInt(assignedTo);
        }
        if (status) {
            query += ` AND ass.Status = @Status`;
            params.Status = status;
        }
        if (capaId) {
            query += ` AND ass.CAPAID = @CAPAID`;
            params.CAPAID = parseInt(capaId);
        }

        query += ` ORDER BY ass.AssignmentDate DESC`;

        const assignments = await executeQuery(query, params);
        return NextResponse.json({ success: true, data: assignments });
    } catch (error) {
        console.error('Error fetching assignments:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch assignments' },
            { status: 500 }
        );
    }
}