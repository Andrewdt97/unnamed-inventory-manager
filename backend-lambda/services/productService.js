import Format from "pg-format";
import productServiceHelpers from "./productServiceHelpers.js";
const { clientService, poolCheck, productCheck, productIdCheck } =
  productServiceHelpers;

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
const updateProduct = async (pool, id, product, path) => {
  const values = Object.values(product);
  const keys = Object.keys(product);

  // Make sure product_id is in the path, if not send unfound error
  if (!path.includes("product_id")) {
    response = {
      statusCode: 400,
      body: JSON.stringify({ message: "Product ID not found in path" }),
    };
  }

  // Check to make sure id (product_id) is in the database
  productIdCheck(id);

  // Creates keys and values array then maps them to one long-ass string ->
  // 'name = 'purple jumpsuit', size = 'Medium', description = 'comes with pockets', sold_date = '6.29.2024''
  const setString = keys
    .map((key, index) => Format("%I = %L", key, values[index]))
    .join(", ");

  /* 
  The setString does not require a placeholder in the query nor to be in the parameters variable.
  This is because the pg library formats the query so that the long-ass string is put into it before
  it is passed to clientService ->
  
  UPDATE product SET name = 'purple jumpsuit', size = 'Medium', description = 'comes with pockets', sold_date = '6.29.2024'
  WHERE product_id = $1

  The product_id value is the only placeholder used here with postgres's $1 placeholder syntax
  */
  const query = `UPDATE product SET ${setString} WHERE product_id = $1`;
  const params = [id];

  poolCheck(pool);
  productCheck(product, keys);

  return clientService(pool, query, params);
};

// NOTE: This function is untested against cockroach
const createProduct = async (pool, product) => {
  const values = Object.values(product);
  const keys = Object.keys(product);
  const params = keys.map((_, index) => values[index]);

  poolCheck(pool);
  productCheck(product, keys);

  /* 
Caleb TODO: Ensure query is safe, regardless of pg purifying and create different setStrings for keys/values
to then use in the queryand clientServce(params) variable requirement
  */

  const query = `INSERT INTO product (${keys.join(", ")}) VALUES (${keys
    .map((_, index) => `$${index + 1}`)
    .join(", ")})`;

  return clientService(pool, query, params);
};

export default { getAllProducts, createProduct, updateProduct };
