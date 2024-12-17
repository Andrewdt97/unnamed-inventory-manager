import { useState, useCallback } from 'react';
import ProductsTable from './ProductsTable';
import AddProduct from './AddProduct';
import ProductDialogue from './ProductDialogue';

import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

function Products() {
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setDialogue] = useState(false);

    const handleLoading = useCallback(() => {
        setLoading(false);
    }, []);

    const handleDialog = () => {
        if(!isDialogOpen) {
            setDialogue(true);
        } else {
            setDialogue(false);
        }
    }

    return (
        <Box>
            {loading ? 
            <Box className="addProductSkeleton">
                <Skeleton variant="rounded" width={160} height={75} />
            </Box>
            : <AddProduct onDialogOpen={handleDialog}/>}
            <ProductsTable onLoading={handleLoading} />
            {isDialogOpen && <ProductDialogue onDialogClose={handleDialog}/>}
        </Box>
    )
}

export default Products;