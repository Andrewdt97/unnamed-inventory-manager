import { productService } from "./productService";

const querySpy = jest.fn();

const mockPool = {
  connect: async () => ({
    query: querySpy,
    release: () => null,
  }),
};

describe("Product Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should select all products", async () => {
    // Setup
    querySpy.mockResolvedValueOnce([{ test: "test" }]);

    // Run
    const res = await productService.getAllProducts(mockPool);

    // Assert
    expect(querySpy).toHaveBeenCalledWith("SELECT * FROM product");
    expect(res).toEqual([{ test: "test" }]);
    expect(releaseSpy).toHaveBeenCalled();
  });

  it("should select a limited number of products", () => {
    // Setup
    querySpy.mockResolvedValueOnce([{ id: 1, name: "product1" }]);
    limit = 1;
    offset = 1;

    // Run
    const pagRes = productService.getAllProducts(mockPool, params);

    // Assert
    expect(querySpy).toHaveBeenCalledWith(
      "SELECT * FROM product LIMIT $1 OFFSET $2",
      limit,
      offset
    );
    expect(pagRes).toContainEqual({ id: 1, name: "product1" });
    expect(releaseSpy).toHaveBeenCalled();
  });
});
