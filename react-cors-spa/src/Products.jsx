import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import { useMemo } from "react";
import "./Products.css";
import Skeleton from '@mui/material/Skeleton';


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
            sku: product.sku,
            size: product.size,
            sold_date: product.sold_date,
        })),
    [data]);

    const columns = [
        { headerClassName: 'super-app-theme--header', field: 'name', headerName: 'Name', width: 150 },
        { headerClassName: 'super-app-theme--header', field: 'description', headerName: 'Description', width: 250},
        { headerClassName: 'super-app-theme--header', field: 'sku', headerName: 'SKU', width: 100 },
        { headerClassName: 'super-app-theme--header', field: 'size', headerName: 'Size', width: 100 },
        { headerClassName: 'super-app-theme--header', field: 'sold_date', headerName: 'Sold Date', width: 200 }
    ];

    return (
        <div className="datagrid">
            {isLoading ? (
                <Skeleton variant='rounded' width={1200} height={300} />
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <DataGrid rows={rows} columns={columns}/>
            )}
        </div>
    );
}

export default Products;