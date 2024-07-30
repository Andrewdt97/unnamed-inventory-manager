import validation from "./validation.js";

describe("Validation Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Validate Product Id", () => {
    it("should return if product_id is in path", async () => {
      // Setup
      const id = 1;
      // Run & Expect
      expect(validation.validateProductId(id)).toEqual(1);
    });
  
    it("should throw an error if productId is not in path", async () => {
      // Setup & Run & Expect
      expect(() => validation.validateProductId()).toThrow(
        "No product ID in path"
      );
    });
  
    it("should throw an error if productId is not a number", async () => {
      expect(() => validation.validateProductId("eleven")).toThrow(
        "Product ID is not a number"
      )
    });
  });
  
  describe("Validate Category Id", () => {
    it("should return if category_id is in path", async () => {
      // Setup
      const id = 1;
      // Run & Expect
      expect(validation.validateCategoryId(id)).toEqual(1);
    });
  
    it("should throw an error if categoryId is not in path", async () => {
      // Setup & Run & Expect
      expect(() => validation.validateCategoryId()).toThrow(
        "No category ID in path"
      );
    });
  
    it("should throw an error if categoryId is not a number", async () => {
      expect(() => validation.validateCategoryId("eleven")).toThrow(
        "Category ID is not a number"
      )
    });
  });
});
