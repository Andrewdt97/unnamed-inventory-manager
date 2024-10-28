import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import "./Products.css";

function Products() {
    const { loading, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: () =>
            axios.get(`http://127.0.0.1:3000/products`, {
                params: {
                    limit: 5,
                    offset: 1,
                },
        }).then((res) => res.data)
    })

    if (loading) return 'Loading...'
    if (error) return 'An error has occured: ' + error.message

    return (
        <div>
            <p>{data.products}</p>
        </div>
    )
}

export default Products;