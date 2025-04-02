import AddProduct from "./AddProduct";
import { Box, Skeleton } from "@mui/material";
import ProductDialog from "./ProductDialog";
import ProductsTable from "./ProductsTable";
import { useCallback, useState } from "react";

function Products() {
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLoading = useCallback(() => {
    setLoading(false);
  }, []);

  function toggleDialogOpen() {
    setIsDialogOpen(true);
  }

  function toggleDialogClose() {
    setIsDialogOpen(false);
  }

  console.log(loading, isDialogOpen);

  return (
    <Box>
      {loading ? (
        <Box className="addProductSkeleton">
          <Skeleton variant="rounded" width={160} height={75} />
        </Box>
      ) : (
        <AddProduct toggleDialogOpen={toggleDialogOpen} />
      )}
      <ProductsTable onLoading={handleLoading} />
      <ProductDialog
        isDialogOpen={isDialogOpen}
        toggleDialogClose={toggleDialogClose}
      />
    </Box>
  );
}

export default Products;
