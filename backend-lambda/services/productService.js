import Format from "pg-format";
import productServiceHelpers from "./productServiceHelpers.js";
const { clientService, poolCheck, productCheck } = productServiceHelpers;

const getAllProducts = async (pool, limit, offset) => {
  poolCheck(pool);

  if (isNaN(limit) || isNaN(offset)) {
    throw new Error("Limit and offset must be numbers");
  }

  const query = `SELECT * FROM product LIMIT $1 OFFSET $2`;
  const params = [limit, offset];

  const result = await clientService(pool, query, params);
  return result.rows;
};

// NOTE: This function is untested against cockroach
const updateProduct = async (pool, id, product) => {
  poolCheck(pool);

  let sets = [];
  for (let key in product) {
    sets.push(Format("%I = %L", key, product[key]));
  }

  let setStrings = sets.join(",");

  const query = "UPDATE product SET %s WHERE product_id = %L";
  const params = [setStrings, id];

  return clientService(pool, query, params);
};

// NOTE: This function is untested against cockroach
const createProduct = async (pool, product) => {
  const values = Object.values(product);
  const keys = Object.keys(product);
  const params = keys.map((_, index) => values[index]);

  await poolCheck(pool);
  await productCheck(product, keys);

  const query = `INSERT INTO product (${keys.join(", ")}) VALUES (${keys
    .map((_, index) => `$${index + 1}`)
    .join(", ")})`;

  return clientService(pool, query, params);
};

export default { getAllProducts, createProduct, updateProduct };
