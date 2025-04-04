import axios from "axios";

/*
Mounting BackendLambda at http://127.0.0.1:3000/product/{product_id} [DELETE, PUT, OPTIONS]
Mounting BackendLambda at http://127.0.0.1:3000/users [GET, OPTIONS]
Mounting BackendLambda at http://127.0.0.1:3000/categories [GET, POST, OPTIONS]
Mounting BackendLambda at http://127.0.0.1:3000/category/{category_id} [DELETE, PUT, OPTIONS]
Mounting BackendLambda at http://127.0.0.1:3000/ [DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT]
Mounting BackendLambda at http://127.0.0.1:3000/products [GET, POST, OPTIONS]
*/

const APIENDPOINT = "http://127.0.0.1:3000/product";

const modifyProduct = async (productData) => {
  const { data } = await axios.put(
    `${APIENDPOINT}/${productData.product_id}`,
    productData
  );
  return data;
};

export default modifyProduct;
