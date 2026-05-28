import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/dal/dbutils';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, ...data } = body;

        if (action === 'generate') {
            const { CAPAID, PreparedBy, COA_Type } = data;
            const result = await executeQuery('sp_GenerateCOA', {
                CAPAID,
                PreparedBy,
                COA_Type: COA_Type || 'FINAL'
            });
            return NextResponse.json({ success: true, data: result[0] });
        }
        else if (action === 'check') {
            const { COAID, CheckedBy, OverallRemarks } = data;
            const result = await executeQuery('sp_CheckCOA', {
                COAID,
                CheckedBy,
                OverallRemarks
            });
            return NextResponse.json({ success: true, data: result[0] });
        }
        else if (action === 'approve') {
            const { COAID, ApprovedBy, Result, OverallRemarks, ValidUntil } = data;
            const result = await executeQuery('sp_ApproveCOA', {
                COAID,
                ApprovedBy,
                Result,
                OverallRemarks,
                ValidUntil
            });
            return NextResponse.json({ success: true, data: result[0] });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Error processing COA:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process COA' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const capaId = searchParams.get('capaId');
        const status = searchParams.get('status');

        let query = `
            SELECT
                coa.*,
                c.CAPA_Code, c.Title as CAPATitle,
                u_prepared.FullName as PreparedByName,
                u_checked.FullName as CheckedByName,
                u_approved.FullName as ApprovedByName
            FROM COA coa
            INNER JOIN CAPA c ON coa.CAPAID = c.CAPAID
            LEFT JOIN Users u_prepared ON coa.PreparedBy = u_prepared.UserID
            LEFT JOIN Users u_checked ON coa.CheckedBy = u_checked.UserID
            LEFT JOIN Users u_approved ON coa.ApprovedBy = u_approved.UserID
            WHERE 1=1
        `;
        const params: any = {};

        if (capaId) {
            query += ` AND coa.CAPAID = @CAPAID`;
            params.CAPAID = parseInt(capaId);
        }
        if (status) {
            query += ` AND coa.COA_Status = @Status`;
            params.Status = status;
        }

        query += ` ORDER BY coa.PreparedAt DESC`;

        const coaList = await executeQuery(query, params);
        return NextResponse.json({ success: true, data: coaList });
    } catch (error) {
        console.error('Error fetching COA:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch COA' },
            { status: 500 }
        );
    }
}