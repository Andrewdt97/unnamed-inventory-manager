import productService from "./productService";

const querySpy = jest.fn();
const mockPool = {
  connect: async () => ({
    query: querySpy,
    release: () => null
  }),
  
}

describe('test', () => {
  it('should run a test', async () => {
    await productService.getAllProducts(mockPool);
    expect(querySpy).toHaveBeenCalledWith('SELECT * FROM product');
  });
});