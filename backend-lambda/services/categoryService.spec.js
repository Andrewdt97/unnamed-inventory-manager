import categoryService from "./categoryService.js";
import format from "pg-format";

const querySpy = jest.fn();
const releaseSpy = jest.fn();

const mockPool = {
  connect: async () => ({
    query: querySpy,
    release: releaseSpy,
  }),
};

describe("Category Service", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe("Get All Categories", () => {
        it("should select all categories", async () => {
            // Setup
            querySpy.mockResolvedValueOnce({ rows: [{ test: "test" }] });
            const limit = 2;
            const offset = 1;

            // Run
            const res = await categoryService.getAllCategories(mockPool, limit, offset);

            // Assert
            expect(querySpy).toHaveBeenCalledWith({
                name: "getAllCategories",
                text: `SELECT * FROM category LIMIT $1 OFFSET $2`,
                values: [limit, offset],
                });
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
              categoryService.getAllCategories(mockPool, limit, offset)
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
            categoryService.getAllCategories(poolMock, limit, offset)
            ).rejects.toThrow("Pool must be an object");
            await expect(
                categoryService.getAllCategories(mockPool, limitMock, offset)
            ).rejects.toThrow("Limit and offset must be numbers");
            await expect(
                categoryService.getAllCategories(mockPool, limit, offsetMock)
            ).rejects.toThrow("Limit and offset must be numbers");
        });
    });
});