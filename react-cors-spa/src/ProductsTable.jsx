import { fetchProducts } from './services/ProductServices';
import { Box, Skeleton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import "./ProductsTable.css";

function ProductsTable({ onLoading }) {
    const { isLoading, error, data } = useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
      select: (data) => data?.data.map((product) => ({
        id: product.product_id,
        name: product.name,
        description: product.description,
        sku: product.sku,
        size: product.size,
        sold_date: product.sold_date,
        }))
    });

    useEffect(() => {
        if (!isLoading) {
            onLoading();
        }
    }, [isLoading, onLoading]);

    const columns = [
        { field: 'name', headerName: 'Name', flex: 2 },
        { field: 'description', headerName: 'Description', flex: 3 },
        { field: 'sku', headerName: 'SKU', flex: 1 },
        { field: 'size', headerName: 'Size', flex: 2 },
        { field: 'sold_date', headerName: 'Sold Date', flex: 2 }
    ];    

    return (
        <Box className="datagrid" style={{ width: '100%'}}>
            {isLoading ? (
                <Skeleton variant='rounded' width={1200} height={300} />
            ) : error ? (
                <Box>
                    <Typography variant='body1'>
                        Error: {error.message}
                    </Typography>
                </Box>
            ) : (
            <DataGrid
            rows={data}
            columns={columns}
            />
            )}
        </Box>
    );
}

export default ProductsTable;