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
        product_id: 7,
        business_id: 1,
        category_id: 2,
        name: "Summer shorts",
      };

      querySpy.mockResolvedValueOnce({ rowCount: 1 });

      const keys = Object.keys(product).join(", ");
      const values = Object.values(product);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

      // Run
      const res = await productService.createProduct(mockPool, product);

      // Assert
      expect(querySpy).toHaveBeenCalledWith(
        `INSERT INTO product (${keys}) VALUES (${placeholders})`,
        values
      );
      expect(res).toEqual(1);
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

      const productMockEmpty = {};
      const productMockType = 5;

      // Run & Assert
      await expect(
        productService.createProduct(mockPool, productMockEmpty)
      ).rejects.toThrow("Product must be an object and cannot be empty");
      await expect(
        productService.createProduct(mockPool, productMockType)
      ).rejects.toThrow("Product must be an object and cannot be empty");
    });

    it("should throw an error if pool is not an object", async () => {
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

      const poolMock = 3;

      // Run & Assert
      await expect(
        productService.createProduct(poolMock, product)
      ).rejects.toThrow("Pool must be an object");
    });
  });

  describe("Update Product", () => {
    it("should update a product", async () => {
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
      const values = Object.values(product);
      const keys = Object.keys(product);
      const setString = keys
        .map((key, index) => Format("%I = %L", key, values[index]))
        .join(", ");
      const id = product.product_id;
      querySpy.mockResolvedValueOnce(product);

      // Run
      const result = await productService.updateProduct(mockPool, id, product);

      // Expect
      expect(querySpy).toHaveBeenCalledWith(
        `UPDATE product SET ${setString} WHERE product_id = $1`,
        [id]
      );
      expect(result).toEqual([
        {
          product_id: 7,
          business_id: 1,
          category_id: 2,
          name: "Summer shorts",
        },
      ]);
    });

    it("should throw an error executing the query", async () => {
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
      const id = product.product_id;

      // Run & Assert
      querySpy.mockRejectedValueOnce(new Error("Error executing query:"));

      // Run & Assert
      await expect(
        productService.updateProduct(mockPool, id, product)
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
      const id = product.product_id;
      const productMockEmpty = {};
      const productMockType = 5;

      // Run & Assert
      await expect(
        productService.updateProduct(mockPool, id, productMockEmpty)
      ).rejects.toThrow("Product must be an object and cannot be empty");
      await expect(
        productService.updateProduct(mockPool, id, productMockType)
      ).rejects.toThrow("Product must be an object and cannot be empty");
    });

    it("should throw an error if pool is not an object", async () => {
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
      const id = product.product_id;

      const poolMock = 3;

      // Run & Assert
      await expect(
        productService.updateProduct(poolMock, id, product)
      ).rejects.toThrow("Pool must be an object");
    });
  });
});
