import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import "./Products.css";

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

    return (
        <div>
            <p>{JSON.stringify(data)}</p>
        </div>
    )
}

export default Products;