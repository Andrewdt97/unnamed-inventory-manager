import format from "pg-format";
import serviceHelpers from "./serviceHelpers.js";
const { clientService, poolCheck, categoryCheck } = serviceHelpers;

const createCategory = async (pool, category) => {
  // Check that pool and product are appropriate data types/values
  poolCheck(pool);
  categoryCheck(category);

  // Assign keys/values
  let keys = Object.keys(category);
  let values = Object.values(category);

  // Assign query & parameters
  const query = format(`INSERT INTO category (%I) VALUES (%L)`, keys, values);

  // Await result
  const res = await clientService(pool, query);
  return res?.rowCount;
};

const getAllCategories = async (pool, limit, offset) => {
  // Check that pool is the right data type
  poolCheck(pool);

  // Check that limit & offset parameters are numbers
  if (isNaN(limit) || isNaN(offset)) {
    throw new Error("Limit and offset must be numbers");
  }

    // Assign query
    const query = {
        name: "getAllCategories",
        text: `SELECT * FROM category LIMIT $1 OFFSET $2`,
        values: [limit, offset],
        };

    // Pass pool & query to clientService to connect to database & execute query
    const result = await clientService(pool, query);
    return result.rows;
}

const updateCategory = async (pool, id, category) => {
  poolCheck(pool);
  categoryCheck(category);

  let sets = [];
  for (let key in category) {
    sets.push(format("%I = %L", key, category[key]));
  }

  let setStrings = sets.join(",");

  const query = format(
    "UPDATE category SET %s WHERE category_id = %L",
    setStrings,
    id
  );

  await clientService(pool, query);
  return "Category Updated";
};

const deleteCategory = async (pool, id) => {
  // Check pool for object type
  poolCheck(pool);

  // Format query
  const query = {
    name: "deleteCategory",
    text: `DELETE FROM category WHERE category_id = $1`,
    values: [id],
  };

  // Pass pool & query to client service to connect to database & execute query
  await clientService(pool, query);

  return "Category Deleted";
};

export default { getAllCategories, createCategory, updateCategory, deleteCategory };