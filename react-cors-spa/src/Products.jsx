import { useState } from 'react';
import ProductsTable from './ProductsTable';
import AddProduct from './AddProduct';

function Products() {
    const [loading, setLoading] = useState(true);

    function handleLoading() {
        setLoading(false);
    }

    return (
        <div>
            <ProductsTable onLoading={handleLoading} />
            {!loading && <AddProduct />}
        </div>
    )
}

export default Products;