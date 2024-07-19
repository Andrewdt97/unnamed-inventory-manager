import format from "pg-format";
import productServiceHelpers from "./productServiceHelpers.js";
const { clientService, poolCheck, productCheck } = productServiceHelpers;

const getAllProducts = async (pool, limit, offset) => {
  // Check that pool is the right data type
  poolCheck(pool);

  // Check that limit & offset parameters are numbers
  if (isNaN(limit) || isNaN(offset)) {
    throw new Error("Limit and offset must be numbers");
  }

  // Assign query
  const query = {
    name: "getAllProducts",
    text: `SELECT * FROM product LIMIT $1 OFFSET $2`,
    values: [limit, offset],
  };

  // Pass pool & query to clientService to connect to database & execute query
  const result = await clientService(pool, query);
  return result.rows;
};

// // NOTE: This function is untested against cockroach
const updateProduct = async (pool, id, product) => {
  poolCheck(pool);
  productCheck(product);

  const values = Object.values(product);
  const keys = Object.keys(product);

  //   // Creates keys and values array then maps them to one long-ass string ->
  //   // ex: 'name = 'purple jumpsuit', size = 'Medium', description = 'comes with pockets', sold_date = '6.29.2024''
  let sets = [];
  for (let key in product) {
    sets.push(format("%I = %L", key, product[key]));
  }

  let setStrings = sets.join(",");

  const query = format(
    "UPDATE product SET %s WHERE product_id = %L",
    setStrings,
    id
  );

  await clientService(pool, query);
  return;
};

// NOTE: This function is untested against cockroach
const createProduct = async (pool, product) => {
  // Check that pool and product are appropriate data types/values
  poolCheck(pool);
  productCheck(product);

  // Assign keys/values
  let keys = Object.keys(product);
  let values = Object.values(product);

  // Assign query & parameters
  const query = format(`INSERT INTO product (%I) VALUES (%L)`, keys, values);

  // Await result
  const res = await clientService(pool, query);
  return res?.rowCount;
};

const deleteProduct = async (pool, id) => {
  // Check pool for object type
  poolCheck(pool);

  // Format query
  const query = format("DELETE FROM product WHERE product_id = $1", id);

  // Pass pool & query to client service to connect to database & execute query
  await clientService(pool, query);
};

export default { getAllProducts, updateProduct, createProduct, deleteProduct };
