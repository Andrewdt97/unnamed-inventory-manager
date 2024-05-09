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
      console.log(connectionString);
      pool = new pg.Pool({
        connectionString,
        // application_name: "$ docs_lambda_node",
        max: 3,
      });
    }
  } catch (e) {
    console.error(JSON.stringify(e));
  }
  let response;
  // get all products
  if (event.path === "/products") {
    if (event.httpMethod === "GET") {
      response = await productService.getAllProducts(pool);
    } else if (event.httpMethod === "POST") {
      let product = event.body;
      response = await productService.createProduct(pool, product);
    }
    // create new product
  } else if (event.path === "/product") {
    response = await productService.createProduct(pool, body);
    // update a product as sold
  } else if (event.path === "/products/sold") {
    response = await productService.updateProduct(pool, body.product_id, body);
    // make items on floor
  } else if (event.path === "/products/to-floor") {
    response = await productService.updateProduct(pool, body.product_id, body);
    // get all users
  } else if (event.path === "/users") {
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
