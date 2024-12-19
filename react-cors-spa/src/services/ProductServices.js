import axios from 'axios';

function fetchProducts() {
    return axios.get('http://127.0.0.1:3000/products?limit=5&offset=0');
}

const APIEndPoint = 'http://127.0.0.1:3000/products';

const createProduct = async (productData) => {
    console.log(productData);
    const { data } = await axios.post(APIEndPoint, productData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:3000/products',
        }
    });
    return data;
};

// name: productData.Name,
// sku: productData.SKU,
// size: productData.Size,
// description: productData.Description,
// category: productData.Category,

export { fetchProducts, createProduct };