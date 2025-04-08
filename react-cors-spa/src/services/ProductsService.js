import axios from "axios";

const APIENDPOINT = "http://127.0.0.1:3000/products";

function fetchProducts() {
  return axios.get(APIENDPOINT);
}

const createProduct = async (productData) => {
  const response = await axios.post(APIENDPOINT, productData);
  return await response.json();
};

export { fetchProducts, createProduct };
