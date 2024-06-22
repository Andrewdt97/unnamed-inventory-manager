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

export default { poolCheck, clientService };
