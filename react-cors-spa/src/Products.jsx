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

  const toggleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  console.log(loading, isDialogOpen);

  return (
    <Box>
      {loading ? (
        <Box className="addProductSkeleton">
          <Skeleton variant="rounded" width={160} height={75} />
        </Box>
      ) : (
        <AddProduct triggerDialog={toggleDialogOpen} />
      )}
      <ProductsTable onLoading={handleLoading} />
      <ProductDialog openDialog={isDialogOpen} closeDialog={toggleDialogOpen} />
    </Box>
  );
}

export default Products;
