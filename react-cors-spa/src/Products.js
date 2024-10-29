import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

function fetchProducts() {
    const result = axios.get('http://127.0.0.1:3000/products?limit=5&offset=0');
    return result;
}

function Products() {
    const { status, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })

    if (status === 'loading') {
        return <span>Loading...</span>
      }
    
    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }

    const rows = [
        {id: JSON.stringify(data.data[0].product_id), col1: JSON.stringify(data.data[0].name)},
        {id: JSON.stringify(data.data[1].product_id), col1: JSON.stringify(data.data[1].name)}
    ];

    const columns = [
        { field: 'col1', headerName: 'Item', width: 150}
    ];

    return (
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      );
}

export default Products;