function validateProductId(productId) {
  if (!productId) {
    throw new Error("No product ID in path");
  }
  return;
}

export default { validateProductId };
