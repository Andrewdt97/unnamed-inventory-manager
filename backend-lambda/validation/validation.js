function validateProductId(productId) {
  if (!productId) {
    throw new Error("No product ID in path");
  }
  
  const id = parseInt(productId);

  if (isNaN(id)) {
    throw new Error("Product ID is not a number");
  };

  return id;
};

export default { validateProductId };
