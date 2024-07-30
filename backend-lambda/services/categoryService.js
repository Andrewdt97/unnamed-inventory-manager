import format from "pg-format";
import serviceHelpers from "./serviceHelpers.js";
const { clientService, poolCheck, categoryCheck } = serviceHelpers;

const getAllCategories = async (pool, limit, offset) => {
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
}

const createCategory = async () => {

}

const updateCategory = async () => {

}

const deleteCategory = async () => {
    
}

export default { getAllCategories, createCategory, updateCategory, deleteCategory };