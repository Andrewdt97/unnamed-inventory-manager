import axios from 'axios';

function fetchProducts() {
    return axios.get('http://127.0.0.1:3000/products?limit=5&offset=0');
}

export default fetchProducts;