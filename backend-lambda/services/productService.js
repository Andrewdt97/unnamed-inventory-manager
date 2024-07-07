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
const updateProduct = async (pool, id, product) => {
  poolCheck(pool);
  productCheck(product);

  const values = Object.values(product);
  const keys = Object.keys(product);

  // Creates keys and values array then maps them to one long-ass string ->
  // ex: 'name = 'purple jumpsuit', size = 'Medium', description = 'comes with pockets', sold_date = '6.29.2024''
  const setString = keys
    .map((key, index) => Format("%I = %L", key, values[index]))
    .join(", ");

  /* 
  The setString does not require a placeholder in the query nor to be in the parameters variable.
  This is because the pg library formats the query so that the long-ass string is put into it before
  it is passed to clientService ->
  
  ex:
  UPDATE product SET name = 'purple jumpsuit', size = 'Medium', description = 'comes with pockets', sold_date = '6.29.2024'
  WHERE product_id = $1

  The product_id value is the only placeholder used here with postgres's $1 placeholder syntax
  */
  const query = `UPDATE product SET ${setString} WHERE product_id = $1`;
  const params = [id];

  const res = await clientService(pool, query, params);
  return res?.rows;
};

// NOTE: This function is untested against cockroach
const createProduct = async (pool, product) => {
  const keys = Object.keys(product).join(", ");
  const values = Object.values(product);
  // Creates a set of placeholders that matches the count of values
  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

  poolCheck(pool);
  productCheck(product, keys);

  const query = `INSERT INTO product (${keys}) VALUES (${placeholders})`;

  /* 
  Execute the query with only the provided values.
  The query will look like: INSERT INTO (product product_id, business_id, category_id, description) VALUES ($1, $2, $3, $4)
  */
  const res = await clientService(pool, query, values);
  return res?.rowCount;
};

export default { getAllProducts, createProduct, updateProduct };
