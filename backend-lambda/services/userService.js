const getUsers = async (p) => {
  const client = await p.connect();
  console.log('Initializing table...');
  try {
    return await client.query(`SELECT * FROM user`);
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

export default {
  getUsers,
};
