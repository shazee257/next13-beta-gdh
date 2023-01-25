'use client';

import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useState } from "react";
import Box from '@mui/material/Box';
import { Poppins } from '@next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400'],
});

export default function MuiGrid({ data, columns, clickHanlder }) {
    const [pageSize, setPageSize] = useState(15);

    function QuickSearchToolbar() {
        return (
            <Box sx={{ p: 0.5, pb: 0, }} >
                <GridToolbarQuickFilter />
            </Box>
        );
    }

    return (
        <DataGrid
            rows={data}
            columns={columns}
            className='px-10 mt-4 w-full'
            rowsPerPageOptions={[15, 20, 50, 100]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowHeight={40}
            autoHeight={true}
            onRowClick={clickHanlder}
            disableSelectionOnClick={true}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableColumnMenu
            components={{ Toolbar: QuickSearchToolbar }}
        />
    )
}
