async function clientService(pool, query, params) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(query, params);
    console.log("RESULT", result);
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

function poolCheck(pool) {
  if (typeof pool !== "object" || pool === null) {
    throw new Error("Pool must be an object");
  }
}

function productCheck(product, keys) {
  if (typeof product !== "object" || keys.length == 0) {
    throw new Error("Product must be an object and cannot be empty");
  }
}

async function productIdCheck(id) {
  let client;
  const query = `SELECT product FROM products WHERE product_id = $1`;
  const params = [id];

  try {
    client = await pool.connect();
    await client.query(query, params);
    return true;
  } catch (error) {
    console.error("Product doesn't exist", error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

export default { poolCheck, clientService, productCheck, productIdCheck };
