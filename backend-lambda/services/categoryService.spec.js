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

  describe("Create New Category", () => {
    it("should create a new category", async () => {
      // Setup
      const category = {
        category_id: 1,
        name: "Store",
      };

      querySpy.mockResolvedValueOnce({ rowCount: 1 });

      // Run
      const res = await categoryService.createCategory(mockPool, category);

      // Assert
      expect(querySpy).toHaveBeenCalledWith(
        "INSERT INTO category (category_id,name) VALUES ('1','Store')"
      );
      expect(res).toEqual(1);
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error and release client", async () => {
      // Setup
      const category = {
        category_id: 1,
        name: "Store",
      };

      querySpy.mockRejectedValueOnce(new Error("Error executing query:"));

      // Run & Assert
      await expect(
        categoryService.createCategory(mockPool, category)
      ).rejects.toThrow("Error executing query:");
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error if category is not an object or an empty object", async () => {
      // Setup
      const category = {
        category_id: 1,
        name: "Store",
      };

      const categoryMockEmpty = {};
      const categoryMockType = 5;

      // Run & Assert
      await expect(
        categoryService.createCategory(mockPool, categoryMockEmpty)
      ).rejects.toThrow("Category must be an object and cannot be empty");
      await expect(
        categoryService.createCategory(mockPool, categoryMockType)
      ).rejects.toThrow("Category must be an object and cannot be empty");
    });

    it("should throw an error if pool is not an object", async () => {
      // Setup
      const category = {
        category_id: 1,
        name: "Store",
      };

      const poolMock = 3;

      // Run & Assert
      await expect(
        categoryService.createCategory(poolMock, category)
      ).rejects.toThrow("Pool must be an object");
    });
  });

  describe("Get All Categories", () => {
    it("should select all categories", async () => {
      // Setup
      querySpy.mockResolvedValueOnce({ rows: [{ test: "test" }] });

      // Run
      const res = await categoryService.getAllCategories(mockPool);

      // Assert
      expect(querySpy).toHaveBeenCalledWith(`SELECT * FROM category`);
      expect(res).toEqual([{ test: "test" }]);
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error and release client", async () => {
      // Setup
      querySpy.mockRejectedValueOnce(new Error("Error executing query:"));

      // Run & Assert
      await expect(categoryService.getAllCategories(mockPool)).rejects.toThrow(
        "Error executing query:"
      );
      expect(releaseSpy).toHaveBeenCalled();
    });
  });

  describe("Update Category", () => {
    it("should update a category", async () => {
      // Setup
      const id = 1;
      const category = {
        name: "Summer",
      };

      querySpy.mockResolvedValueOnce(category);

      // Run
      await categoryService.updateCategory(mockPool, id, category);

      // Expect
      expect(querySpy).toHaveBeenCalledWith(
        "UPDATE category SET name = 'Summer' WHERE category_id = '1'"
      );
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error executing the query", async () => {
      // Setup
      const category = {
        category_id: 1,
        name: "Summer",
      };
      const id = category.category_id;
      querySpy.mockRejectedValueOnce(new Error("Error executing query:"));

      // Run & Assert
      await expect(
        categoryService.updateCategory(mockPool, id, category)
      ).rejects.toThrow("Error executing query:");
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error if category is not an object or an empty object", async () => {
      // Setup
      const category = {
        category_id: 1,
        name: "Summer",
      };

      const id = category.category_id;
      const categoryMockEmpty = {};
      const categoryMockType = 5;

      // Run & Assert
      await expect(
        categoryService.updateCategory(mockPool, id, categoryMockEmpty)
      ).rejects.toThrow("Category must be an object and cannot be empty");
      await expect(
        categoryService.updateCategory(mockPool, id, categoryMockType)
      ).rejects.toThrow("Category must be an object and cannot be empty");
    });

    it("should throw an error if pool is not an object", async () => {
      // Setup
      const category = {
        category_id: 1,
        name: "Summer",
      };
      const id = category.category_id;

      const poolMock = 3;

      // Run & Assert
      await expect(
        categoryService.updateCategory(poolMock, id, category)
      ).rejects.toThrow("Pool must be an object");
    });
  });

  describe("Delete Category", () => {
    it("should delete a category & release client", async () => {
      // Setup
      const id = 1;
      querySpy.mockResolvedValueOnce("Category Deleted");

      // Run
      const res = await categoryService.deleteCategory(mockPool, id);

      // Expect
      expect(querySpy).toHaveBeenCalledWith({
        name: "deleteCategory",
        text: `DELETE FROM category WHERE category_id = $1`,
        values: [id],
      });
      expect(res).toEqual("Category Deleted");
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error executing the query & release client", async () => {
      // Setup
      const id = 1;
      querySpy.mockRejectedValueOnce(new Error("Error executing query:"));

      // Run & Expect
      await expect(
        categoryService.deleteCategory(mockPool, id)
      ).rejects.toThrow("Error executing query:");
      expect(releaseSpy).toHaveBeenCalled();
    });

    it("should throw an error if pool is not an object", async () => {
      // Setup
      const id = 1;
      const poolMock = 3;

      // Run & Assert
      await expect(
        categoryService.deleteCategory(poolMock, id)
      ).rejects.toThrow("Pool must be an object");
    });
  });
});
