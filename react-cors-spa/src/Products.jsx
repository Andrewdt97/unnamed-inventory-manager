import { useState, useCallback } from 'react';
import ProductsTable from './ProductsTable';
import AddProduct from './AddProduct';
import ProductDialogue from './ProductDialogue';

import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

function Products() {
    const [loading, setLoading] = useState(true);
    const [dialogue, setDialogue] = useState(false);

    const handleLoading = useCallback(() => {
        setLoading(false);
    }, []);

    return (
        <Box>
            {loading ? 
            <Box className="addProductSkeleton">
                <Skeleton variant="rounded" width={160} height={75} />
            </Box>
            : <AddProduct onDialogue={() => setDialogue(true)}/>}
            <ProductsTable onLoading={handleLoading} />
            {dialogue && <ProductDialogue onDialogue={() => setDialogue(false)}/>}
        </Box>
    )
}

export default Products;