async function clientService(pool, query) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(query);
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

function productCheck(product) {
  if (typeof product !== "object" || Object.keys(product).length === 0) {
    throw new Error("Product must be an object and cannot be empty");
  }
}

function categoryCheck(category) {
  if (typeof category !== "object" || Object.keys(category).length === 0) {
    throw new Error("Category must be an object and cannot be empty");
  }
}

export default { poolCheck, clientService, productCheck, categoryCheck };
