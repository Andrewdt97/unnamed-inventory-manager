import { useState, useCallback } from 'react';
import ProductsTable from './ProductsTable';
import AddProduct from './AddProduct';
import Skeleton from '@mui/material/Skeleton';

function Products() {
    const [loading, setLoading] = useState(true);

    const handleLoading = useCallback(() => {
        setLoading(false);
    }, []);

    return (
        <div>
            {loading ? 
            <div className="addProductSkeleton">
                <Skeleton variant="rounded" width={160} height={75} />
            </div> : <AddProduct />}
            <ProductsTable onLoading={handleLoading} />
        </div>
    )
}

export default Products;