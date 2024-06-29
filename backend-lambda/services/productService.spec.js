import productService from "./productService.js";
import Format from "pg-format";

const querySpy = jest.fn();
const releaseSpy = jest.fn();

const mockPool = {
  connect: async () => ({
    query: querySpy,
    release: releaseSpy,
  }),
};

describe("Product Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Get All Products", () => {
    it("should select all products", async () => {
      // Setup
      querySpy.mockResolvedValueOnce({ rows: [{ test: "test" }] });
      const limit = 2;
      const offset = 1;

      // Run
      const res = await productService.getAllProducts(mockPool, limit, offset);

      // Assert
      expect(querySpy).toHaveBeenCalledWith(
        "SELECT * FROM product LIMIT $1 OFFSET $2",
        [limit, offset]
      );
      expect(res).toEqual([{ test: "test" }]);
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error and release client", async () => {
      // Setup
      querySpy.mockRejectedValueOnce(new Error("Error executing query:"));
      const limit = 1;
      const offset = 2;

      // Run & Assert
      await expect(
        productService.getAllProducts(mockPool, limit, offset)
      ).rejects.toThrow("Error executing query:");
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error if params are incorrect data type", async () => {
      // Setup
      const limit = 1;
      const offset = 2;

      const poolMock = 3;
      const limitMock = "limitMock";
      const offsetMock = "offsetMock";

      // Run & Assert
      await expect(
        productService.getAllProducts(poolMock, limit, offset)
      ).rejects.toThrow("Pool must be an object");
      await expect(
        productService.getAllProducts(mockPool, limitMock, offset)
      ).rejects.toThrow("Limit and offset must be numbers");
      await expect(
        productService.getAllProducts(mockPool, limit, offsetMock)
      ).rejects.toThrow("Limit and offset must be numbers");
    });
  });

  describe("Create new product", () => {
    it("should create a new product", async () => {
      // Setup
      const product = {
        rows: [
          {
            product_id: 7,
            business_id: 1,
            category_id: 2,
            name: "Summer shorts",
          },
        ],
      };

      querySpy.mockResolvedValueOnce(product);

      const values = Object.values(product);
      const keys = Object.keys(product);

      // Run
      const res = await productService.createProduct(mockPool, product);

      // Assert
      expect(querySpy).toHaveBeenCalledWith(
        `INSERT INTO product (${keys.join(", ")}) VALUES (${keys
          .map((_, index) => `$${index + 1}`)
          .join(", ")})`,
        values
      );
      expect(res.rows).toEqual([
        {
          business_id: 1,
          category_id: 2,
          name: "Summer shorts",
          product_id: 7,
        },
      ]);
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error and release client", async () => {
      // Setup
      const product = {
        rows: [
          {
            product_id: 7,
            business_id: 1,
            category_id: 2,
            name: "Summer shorts",
          },
        ],
      };
      querySpy.mockRejectedValueOnce(new Error("Error executing query:"));

      // Run & Assert
      await expect(
        productService.createProduct(mockPool, product)
      ).rejects.toThrow("Error executing query:");
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error if product is not an object or an empty object", async () => {
      // Setup
      const product = {
        rows: [
          {
            product_id: 7,
            business_id: 1,
            category_id: 2,
            name: "Summer shorts",
          },
        ],
      };
      querySpy.mockResolvedValue(product);
      const poolMock = "test-type";
      const productEmpty = {};
      const productWrongDataType = 5;

      // Run & Assert
      await expect(
        productService.createProduct(poolMock, product)
      ).rejects.toThrow("Pool must be an object");
      await expect(
        productService.createProduct(mockPool, productEmpty)
      ).rejects.toThrow("Product must be an object and cannot be empty");
      await expect(
        productService.createProduct(mockPool, productWrongDataType)
      ).rejects.toThrow("Product must be an object and cannot be empty");
    });
  });
});
