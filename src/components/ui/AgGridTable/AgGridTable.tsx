'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';



interface AgGridTableProps {
    columns: ColDef[];
    data: any[];
    onRowClicked?: (data: any) => void;
    pagination?: boolean;
    paginationPageSize?: number;
    height?: string;
    width?: string;
}

export const AgGridTable: React.FC<AgGridTableProps> = ({
    columns,
    data,
    onRowClicked,
    pagination = true,
    paginationPageSize = 10,
    height = '500px',
    width = '100%'
}) => {
    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    }, []);

    const defaultColDef = useMemo<ColDef>(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        editable: false,
        flex: 1,
        minWidth: 100,
    }), []);

    const onRowClickedHandler = useCallback((event: any) => {
        if (onRowClicked && event.data) {
            onRowClicked(event.data);
        }
    }, [onRowClicked]);

    return (
         <div style={{ width: "100%",  height: "auto" }}>
      <div className="ag-theme-alpine" style={{ width: "100%", height: "auto" }}>

            <AgGridReact
             theme="legacy"
             domLayout="autoHeight"
                rowData={data}
                columnDefs={columns}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                onRowClicked={onRowClickedHandler}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                animateRows={true}
                rowSelection="single"
                enableCellTextSelection={true}
                ensureDomOrder={true}
            />
        </div>
          </div>
    );
};