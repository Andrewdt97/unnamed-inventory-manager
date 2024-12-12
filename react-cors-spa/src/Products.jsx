import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from "react";
import "./Products.css";
import Skeleton from '@mui/material/Skeleton';
import { DataGrid } from '@mui/x-data-grid';
import fetchProducts from './services/ProductsService';

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
            sku: product.sku,
            size: product.size,
            sold_date: product.sold_date,
        })),
    [data]);

    const columns = [
        { field: 'name', headerName: 'Name', flex: 2 },
        { field: 'description', headerName: 'Description', flex: 3 },
        { field: 'sku', headerName: 'SKU', flex: 1 },
        { field: 'size', headerName: 'Size', flex: 2 },
        { field: 'sold_date', headerName: 'Sold Date', flex: 2 }
    ];    

    return (
        <div className="datagrid" style={{ width: '100%'}}>
            {isLoading ? (
                <Skeleton variant='rounded' width={1200} height={300} />
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
            <DataGrid
            rows={rows}
            columns={columns}
            />
            )}
        </div>
    );
}

export default Products;