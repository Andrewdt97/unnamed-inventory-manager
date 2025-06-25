import { fetchProducts } from "./services/ProductsService";
import { Box, Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import EditProductIcon from "./EditProductIcon";
import EditProductDialog from "./EditProductDialog";
import "./ProductsTable.css";
import { useState } from "react";

function ProductsTable({ onLoading }) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  function toggleEditDialog(product) {
    if (editDialogOpen) {
      setEditDialogOpen(false);
      setSelectedProduct({});
    } else if (!editDialogOpen && Object.keys(product).length > 0) {
      setSelectedProduct(product);
      setEditDialogOpen(true);
    }
  }

  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

  function getRandomDate() {
    const date = new Date();
    date.setDate(getRandomIntInclusive(1, 28));

    return date.toLocaleDateString("en-US");
  }

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    select: (data) =>
      data?.data.map((product) => ({
        id: product.product_id,
        name: product.name,
        description: product.description,
        sku: product.sku,
        size: product.size,
        sold_date: product.sold_date,
        category_id: product.category_id,
        date_created: getRandomDate(),
      })),
  });

  useEffect(() => {
    if (!isLoading) {
      onLoading();
    }
  }, [isLoading, onLoading]);

  const columns = [
    { field: "name", headerName: "Name", flex: 2 },
    { field: "description", headerName: "Description", flex: 3 },
    { field: "sku", headerName: "SKU", flex: 1 },
    { field: "size", headerName: "Size", flex: 2 },
    { field: "sold_date", headerName: "Sold Date", flex: 2 },
    { field: "date_created", headerName: "Date Created", flex: 1.5 },
    {
      field: "edit",
      headerName: "",
      flex: 0.25,
      sortable: false,
      filterable: false, // Disable filtering
      disableColumnMenu: true, // Remove menu options
      renderCell: (params) => (
        <EditProductIcon
          toggleEditDialog={() => toggleEditDialog(params.row)}
        />
      ),
    },
  ];

  return (
    <Box className="datagrid" style={{ width: "100%" }}>
      {isLoading && !data && (
        <Skeleton variant="rounded" width={1200} height={300} />
      )}
      {error && (
        <Box>
          <Typography variant="body1">Error: {error.message}</Typography>
        </Box>
      )}
      {data && <DataGrid rows={data} columns={columns} />}
      {/* Conditional rendering with MUI is handled within the Dialog component, check the 'open' prop */}
      <EditProductDialog
        toggleEditDialog={toggleEditDialog}
        editDialogOpen={editDialogOpen}
        selectedProduct={selectedProduct}
        refetch={refetch}
      />
    </Box>
  );
}

export default ProductsTable;
