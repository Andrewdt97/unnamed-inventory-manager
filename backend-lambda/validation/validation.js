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

function validateCategoryId(category_id) {
  if (!category_id) {
    throw new Error("No category ID in path");
  }
  
  const id = parseInt(category_id);

  if (isNaN(id)) {
    throw new Error("Category ID is not a number");
  };

  return id;
}

export default { validateProductId, validateCategoryId };
