import { useState, useCallback } from 'react';
import ProductsTable from './ProductsTable';
import AddProduct from './AddProduct';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

function Products() {
    const [loading, setLoading] = useState(true);

    const handleLoading = useCallback(() => {
        setLoading(false);
    }, []);

    return (
        <Box>
            {loading ? 
            <Box className="addProductSkeleton">
                <Skeleton variant="rounded" width={160} height={75} />
            </Box> : <AddProduct />}
            <ProductsTable onLoading={handleLoading} />
        </Box>
    )
}

export default Products;