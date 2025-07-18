import format from "pg-format";
import serviceHelpers from "./serviceHelpers.js";
const { clientService, poolCheck, productCheck } = serviceHelpers;

const getAllProducts = async (pool, limit, offset) => {
  // Check that pool is the right data type
  poolCheck(pool);
  let query = {};
  query.name = "getAllProducts";

  // Check that limit & offset parameters are numbers
  if (isNaN(limit) || isNaN(offset)) {
    query.text = `SELECT * FROM product`;
  } else {
    query.text = `SELECT * FROM product LIMIT $1 OFFSET $2`;
    query.values = [limit, offset];
  }

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
  return "Product Updated";
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
  const query = {
    name: "deleteProduct",
    text: `DELETE FROM product WHERE product_id = $1`,
    values: [id],
  };

  // Pass pool & query to client service to connect to database & execute query
  await clientService(pool, query);

  return "Product Deleted";
};

export default { getAllProducts, updateProduct, createProduct, deleteProduct };
