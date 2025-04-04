import axios from "axios";

const APIENDPOINT = "http://127.0.0.1:3000/products";

function fetchProducts() {
  return axios.get(APIENDPOINT);
}

const createProduct = async (productData) => {
  const { data } = await axios.post(APIENDPOINT, productData);
  return data;
};

export { fetchProducts, createProduct };
