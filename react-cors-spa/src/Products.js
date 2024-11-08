import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo } from "react";
import { theme } from "./ProductStyles";

function fetchProducts() {
    return axios.get('http://127.0.0.1:3000/products?limit=5&offset=0');
}

function Products() {
    const { isLoading, error, data } = useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
    });

    const rows = useMemo(() => 
        data?.data.map((product) => ({
            id: product.product_id,
            name: product.name,
            description: product.description,
        })),
    [data]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 150},
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 250},
    ];

    return (
        <ThemeProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        <div style={{ height: 400, width: '100%' }}>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <DataGrid rows={rows} columns={columns}/>
            )}
        </div>
        </ThemeProvider>
    );
}

export default Products;