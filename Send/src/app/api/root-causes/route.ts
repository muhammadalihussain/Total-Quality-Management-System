import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/dal/dbutils';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { CAPAID, RootCauseTitle, RootCauseDetails, Category, CreatedBy } = body;

        const result = await executeQuery('sp_AddRootCause', {
            CAPAID,
            RootCauseTitle,
            RootCauseDetails,
            Category,
            CreatedBy
        });

        return NextResponse.json({ success: true, data: result[0] });
    } catch (error) {
        console.error('Error adding root cause:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to add root cause' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const capaId = searchParams.get('capaId');

        const rootCauses = await executeQuery(`
            SELECT
                rc.*,
                u.FullName as CreatedByName,
                u_verified.FullName as VerifiedByName
            FROM RootCauses rc
            LEFT JOIN Users u ON rc.CreatedBy = u.UserID
            LEFT JOIN Users u_verified ON rc.VerifiedBy = u_verified.UserID
            WHERE rc.CAPAID = @CAPAID
            ORDER BY rc.CreatedAt
        `, { CAPAID: parseInt(capaId || '0') });

        return NextResponse.json({ success: true, data: rootCauses });
    } catch (error) {
        console.error('Error fetching root causes:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch root causes' },
            { status: 500 }
        );
    }
}