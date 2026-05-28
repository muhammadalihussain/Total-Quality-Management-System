import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/dal/dbutils';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { CAPAID, ActionID, TestName, TestParameters, ExpectedResult, ActualResult, IsPassed, TestedBy, Remarks } = body;

        const result = await executeQuery('sp_EnterQCTestResults', {
            CAPAID,
            ActionID,
            TestName,
            TestParameters,
            ExpectedResult,
            ActualResult,
            IsPassed,
            TestedBy,
            Remarks
        });

        return NextResponse.json({ success: true, data: result[0] });
    } catch (error) {
        console.error('Error entering QC test results:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to enter QC test results' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const capaId = searchParams.get('capaId');
        const actionId = searchParams.get('actionId');

        let query = `
            SELECT
                qr.*,
                u_tested.FullName as TestedByName,
                u_verified.FullName as VerifiedByName,
                a.ActionTitle
            FROM QCTestResults qr
            LEFT JOIN Users u_tested ON qr.TestedBy = u_tested.UserID
            LEFT JOIN Users u_verified ON qr.VerifiedBy = u_verified.UserID
            LEFT JOIN CAPAActions a ON qr.ActionID = a.ActionID
            WHERE 1=1
        `;
        const params: any = {};

        if (capaId) {
            query += ` AND qr.CAPAID = @CAPAID`;
            params.CAPAID = parseInt(capaId);
        }
        if (actionId) {
            query += ` AND qr.ActionID = @ActionID`;
            params.ActionID = parseInt(actionId);
        }

        query += ` ORDER BY qr.TestedAt DESC`;

        const testResults = await executeQuery(query, params);
        return NextResponse.json({ success: true, data: testResults });
    } catch (error) {
        console.error('Error fetching QC test results:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch QC test results' },
            { status: 500 }
        );
    }
}