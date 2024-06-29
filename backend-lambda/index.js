import pg from "pg";
import userService from "./services/userService.js";
import productService from "./services/productService.js";
let pool;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const handler = async (event, context) => {
  const body =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  console.info("event", event);
  console.info("context", context);
  // Log the parsed body in a formatted way
  console.info(body);
  try {
    if (!pool) {
      const connectionString = process.env.DATABASE_URL;
      pool = new pg.Pool({
        connectionString: connectionString,
      });
    }
  } catch (e) {
    console.error(JSON.stringify(e));
  }
  let response;

  // define path string to check for product_id in updateProduct
  const path = event.path;

  if (event.path === "/products") {
    // get all products
    if (event.httpMethod === "GET") {
      const limit = event.queryStringParameters.limit;
      const offset = event.queryStringParameters.offset;
      response = await productService.getAllProducts(pool, limit, offset);
    }
    // create a product
    else if (event.httpMethod === "POST") {
      response = await productService.createProduct(pool, body);
    }
  }

  // update a product
  else if (event.path === "/product" && event.httpMethod === "PUT") {
    response = await productService.updateProduct(pool, productId, body, path);
  }
  // update a product as sold
  else if (event.path === "/products/sold" && event.httpMethod === "PUT") {
    response = await productService.updateProduct(pool, productId, body, path);
  }
  // make items on floor
  else if (event.path === "/products/to-floor" && event.httpMethod === "POST") {
    response = await productService.updateProduct(
      pool,
      body.product_id,
      body,
      path
    );
  }
  // get all users
  else if (event.path === "/users" && event.httpMethod === "GET") {
    response = await userService.getUsers(pool);
  }

  if (response === undefined) {
    throw new Error(`No response`);
  }
  return {
    headers,
    statusCode: 200,
    body: typeof response === "string" ? response : JSON.stringify(response),
  };
};
