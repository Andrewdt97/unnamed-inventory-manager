const { Pool } = require('pg');
import userService from './services/userService';
import productService from './services/productService';
let pool;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};


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
      response = await productService.getAllProducts(pool);
    } else if (event.httpMethod === 'POST') {
      response = await productService.createProduct(pool, JSON.parse(event.body));
    }
    // create product
  } else if (event.path.includes('/product/')) {
    // update product
  } else if (event.path === '/products/sold') {
    // mark products sold
  } else if (event.path === '/products/to-floor') {
    // make items on floor
  } else if (event.path === '/users') {
    response = await userService.getUsers(pool);
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
