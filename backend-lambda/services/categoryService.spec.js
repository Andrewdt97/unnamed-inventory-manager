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

describe("Product Service", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
});