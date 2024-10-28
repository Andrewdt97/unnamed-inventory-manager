import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function Products() {
    const { isPending, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: () =>
            axios.get(`http://127.0.0.1:3000/products`, {
                params: {
                    limit: 5,
                    offset: 1,
                },
        }).then((res) => res.data)
    })

    if (isPending) return 'Loading...'
    if (error) return 'An error has occured: ' + error.message

    return (
        <div>
            <p>{data}</p>
        </div>
    )
}

export default Products;