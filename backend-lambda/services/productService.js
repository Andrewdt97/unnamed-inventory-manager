const Format = require('pg-format');

const getAllProducts = async (p) => {
  const client = await p.connect();
  try {
    return await client.query(`SELECT * FROM product`);
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

// NOTE: This function is untested against cockroach
const updateProduct = async (p, id, product) => {
  const client = await p.connect();
  try {
    let sets = [];
    for (let key in product) {
      sets.push(Format('%I = %L', key, product[key]));
    }

    let setStrings = sets.join(',');

    const sql = Format('UPDATE product SET %s WHERE id = %L', setStrings, id);
    const result = await client.query(query);
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
      'INSERT INTO product (%I) VALUES (%L)',
      Object.keys(product),
      Object.values(product)
    );
    console.info('create sql', sql);
    return await client.query(sql);
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.release();
  }
};

export default { getAllProducts, createProduct, updateProduct };
