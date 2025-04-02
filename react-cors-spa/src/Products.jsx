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

  function toggleDialog() {
    setIsDialogOpen(!isDialogOpen);
  }

  return (
    <Box>
      {loading ? (
        <Box className="addProductSkeleton">
          <Skeleton variant="rounded" width={160} height={75} />
        </Box>
      ) : (
        <AddProduct toggleDialogOpen={toggleDialog} />
      )}
      <ProductsTable onLoading={handleLoading} />
      <ProductDialog
        isDialogOpen={isDialogOpen}
        toggleDialogClose={toggleDialog}
      />
    </Box>
  );
}

export default Products;
