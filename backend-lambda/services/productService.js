import Format from "pg-format";
const clientService = require("./productServiceHelpers");

const getAllProducts = async (pool, limit, offset) => {
  if (typeof pool !== "object" || pool === null) {
    throw new Error("Pool must be an object");
  }

  if (isNaN(limit) || isNaN(offset)) {
    throw new Error("Limit and offset must be numbers");
  }

  const query = `SELECT * FROM product LIMIT $1 OFFSET $2`;
  const params = [limit, offset];

  return clientService(pool, query, params);
};

// NOTE: This function is untested against cockroach
const updateProduct = async (pool, id, product) => {
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
  const query = "INSERT INTO product (%I) VALUES (%L)";
  const params = [Object.keys(product), Object.values(product)];

  clientService(pool, query, params);
};

export default { getAllProducts, createProduct, updateProduct };
