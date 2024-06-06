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

  if (event.path === "/products") {
    // get all products
    if (event.httpMethod === "GET") {
      response = await productService.getAllProducts(pool);
    } else if (event.httpMethod === "POST") {
      const product = body;
      response = await productService.createProduct(pool, product);
    }
  } else if (event.path === "/product" && event.httpMethod === "PUT") {
    // create new product
    response = await productService.updateProduct(pool, body);
  } else if (event.path === "/products/sold" && event.httpMethod === "PUT") {
    // update a product as sold
    response = await productService.updateProduct(pool, body.product_id, body);
  } else if (
    event.path === "/products/to-floor" &&
    event.httpMethod === "POST"
  ) {
    // make items on floor
    response = await productService.updateProduct(pool, body.product_id, body);
  } else if (event.path === "/users" && event.httpMethod === "GET") {
    // get all users
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
