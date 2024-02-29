import productService from './productService';

const querySpy = jest.fn();

const mockPool = {
  connect: async () => ({
    query: querySpy,
    release: () => null,
  }),
};

describe('Product Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should select all products', async () => {
    // Setup
    querySpy.mockResolvedValueOnce([{ test: 'test' }]);

    // Run
    const res = await productService.getAllProducts(mockPool);

    // Assert
    expect(querySpy).toHaveBeenCalledWith('SELECT * FROM product');
    expect(res).toEqual([{ test: 'test' }]);
    expect(releaseSpy).toHaveBeenCalled();
  });
});
