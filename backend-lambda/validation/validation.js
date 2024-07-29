function validateProductId(productId) {
  if (!productId) {
    throw new Error("No product ID in path");
  }
  return parseInt(productId);
}

export default { validateProductId };
