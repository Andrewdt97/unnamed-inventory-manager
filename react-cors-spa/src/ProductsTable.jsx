import CreateIcon from "@mui/icons-material/Create";
import EditProduct from "./EditProduct";
import { fetchProducts } from './services/ProductServices';
import { Box, Skeleton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useMemo, useState } from "react";
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
        })) || []
    });

    useEffect(() => {
        if (!isLoading) {
            onLoading();
        }
    }, [isLoading, onLoading]);

    function ActionsWithModalGrid() {
        const [rows, setRows] = useState(data);

        const editProduct = useCallback(
            (id) => () => {
                setTimeout(() => {
                    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
                });
            },
            [],
        );

        const columns = useMemo(
            () => [
                { field: 'name', headerName: 'Name', flex: 2 },
                { field: 'description', headerName: 'Description', flex: 3 },
                { field: 'sku', headerName: 'SKU', flex: 1 },
                { field: 'size', headerName: 'Size', flex: 2 },
                { field: 'sold_date', headerName: 'Sold Date', flex: 2 },
                { field: 'actions', type: 'actions', flex: 1, getActions: (params) => [
                    <EditProduct
                        label="Edit"
                        showInMenu
                        icon={<CreateIcon />}
                        editProduct={editProduct(params.id)}
                        closeMenuOnClick={false}
                    />,
                    ],
                },
            ],
            [editProduct],
        );

        return (
            <Box className="datagrid" style={{ width: '100%'}}>
                {isLoading && (<Skeleton variant='rounded' width={1200} height={300} />)}
                {error && (<Box> <Typography variant='body1'> Error: {error.message} </Typography> </Box>)} 
                {!isLoading && !error && (<DataGrid rows={data} columns={columns}/>)}
            </Box>
        );
    }
}

export default ProductsTable;