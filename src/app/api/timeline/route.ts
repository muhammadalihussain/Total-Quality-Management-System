import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/dal/dbutils';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const capaId = searchParams.get('capaId');

        if (!capaId) {
            return NextResponse.json(
                { success: false, error: 'CAPA ID is required' },
                { status: 400 }
            );
        }

        const timeline = await executeQuery('sp_GetCAPAWorkflowTimeline', {
            CAPAID: parseInt(capaId)
        });

        return NextResponse.json({ success: true, data: timeline });
    } catch (error) {
        console.error('Error fetching timeline:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch timeline' },
            { status: 500 }
        );
    }
}