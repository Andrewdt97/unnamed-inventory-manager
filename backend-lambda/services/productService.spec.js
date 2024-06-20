import productService from "./productService.js";

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
});
