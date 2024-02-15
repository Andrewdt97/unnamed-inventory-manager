const { Pool } = require('pg');
var Format = require('pg-format');

let pool;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

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
console.log('GET TO THA CHOPPA 50 PACES TO YOUR WEST');
// const insertAccounts = async (p, n) => {
//   const client = await p.connect();
//   console.log("Hey! You successfully connected to your CockroachDB cluster.");
//   try {
//     while (n > 0) {
//       const balanceValue = [Math.floor(Math.random() * 1000)];
//       await client.query(
//         "INSERT INTO accounts (id, balance) VALUES (DEFAULT, $1)",
//         balanceValue
//       );
//       n -= 1;
//       console.log(`Created new account with balance ${balanceValue}.`);
//     }
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     client.release();
//   }
// };

exports.handler = async (event, context) => {
  console.info('event', event);
  console.info('context', context);
  try {
    if (!pool) {
      const connectionString = process.env.DATABASE_URL;
      pool = new Pool({
        connectionString,
        application_name: '$ docs_lambda_node',
        max: 1,
      });
    }
  } catch (e) {
    console.error(JSON.stringify(e));
  }
  let response;

  if (event.path === '/products') {
    if (event.httpMethod === 'GET') {
      response = await getAllProducts(pool);
    } else if (event.httpMethod === 'POST') {
      response = await createProduct(pool, JSON.parse(event.body));
    }
    // create product
  } else if (event.path.includes('/product/')) {
    // update product
  } else if (event.path === '/products/sold') {
    // mark products sold
  } else if (event.path === '/products/to-floor') {
    // make items on floor
  } else if (event.path === '/users') {
    response = await getUsers(pool);
  }

  if (response === undefined) {
    throw new Error(`No response`);
  }
  return {
    headers,
    statusCode: 200,
    body:
      typeof response?.rows === 'string'
        ? response?.rows
        : JSON.stringify(response?.rows),
  };
};
