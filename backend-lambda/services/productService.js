import Format from "pg-format";
const getAllProducts = async (pool) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query("SELECT * FROM product");
    console.log("RESULT", result);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    if (client) {
      client.release(); // Release the client back to the pool
    }
  }
};

const updateProduct = async (p, id, product) => {
  const client = await p.connect();
  try {
    let sets = [];
    let values = [];
    for (let key in product) {
      if (key === "sold_date") {
        // If key is 'sold_date', set it to the current date and time
        sets.push(`${key} = $${sets.length + 1}`);
        values.push(new Date().toISOString()); // Add current date and time to values array
      } else {
        // Otherwise, use the product[key] value
        sets.push(`${key} = $${sets.length + 1}`);
        values.push(product[key]);
      }
    }

    let setStrings = sets.join(",");

    // Construct the parameterized SQL query
    const sql = `UPDATE product SET ${setStrings} WHERE product_id = $${
      values.length + 1
    }`;

    // Add the product_id value to the end of the values array
    values.push(id);

    // Execute the parameterized query with the values array
    const result = await client.query(sql, values);
    return result;
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

// NOTE: This function is untested against cockroach
const createProduct = async (p, product) => {
  const client = await p.connect();
  try {
    const sql = Format(
      "INSERT INTO product (%I) VALUES (%L)",
      Object.keys(product),
      Object.values(product)
    );
    console.info("create sql", sql);
    return await client.query(sql);
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

export default { getAllProducts, createProduct, updateProduct };
