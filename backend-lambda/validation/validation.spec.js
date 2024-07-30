import validation from "./validation.js";

describe("Validate Product Id", () => {
  it("should return if product_id is in path", async () => {
    // Setup
    const id = 1;
    // Run & Expect
    expect(validation.validateProductId(id)).toEqual(undefined);
  });

  it("should throw an error if productId is not in path", async () => {
    // Setup & Run & Expect
    expect(() => validation.validateProductId()).toThrow(
      "No product ID in path"
    );
  });
});
