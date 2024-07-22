import pg from "pg";
import userService from "./services/userService.js";
import productService from "./services/productService.js";
import validate from "./validation/validation.js";
let pool;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const handler = async (event, context) => {
  const body =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  // define path string to check for product_id in updateProduct
  const path = event.path;
  const httpMethod = event.httpMethod;
  console.info("event", event);
  console.info("context", context);
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

  if (path === "/products") {
    // get all products
    if (httpMethod === "GET") {
      const limit = event.queryStringParameters.limit;
      const offset = event.queryStringParameters.offset;
      response = await productService.getAllProducts(pool, limit, offset);
    }
    // create a product
    else if (httpMethod === "POST") {
      response = await productService.createProduct(pool, body);
    }
  }

  // delete a product
  else if (path.includes("/product/delete") && httpMethod === "DELETE") {
    await validate.validateProductId(event.pathParameters.product_id);
    response = await productService.deleteProduct(
      pool,
      event.pathParameters.product_id
    );
  }

  // update a product
  else if (path.startsWith("/product/") && httpMethod === "PUT") {
    await validate.validateProductId(event.pathParameters.product_id);
    response = await productService.updateProduct(
      pool,
      event.pathParameters.product_id,
      body
    );
  }

  // get all users
  else if (path === "/users" && httpMethod === "GET") {
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
