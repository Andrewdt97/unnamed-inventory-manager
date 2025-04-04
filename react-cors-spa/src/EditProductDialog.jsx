import { Fragment, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useQuery, useMutation } from "@tanstack/react-query";
import fetchCategories from "./services/CategoryServices";
import modifyProduct from "./services/ProductService";
import "./EditProductDialog.css";

function EditProductDialog({
  toggleEditDialog,
  editDialogOpen,
  selectedProduct,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      size: "",
      category: "",
    },
  });

  const category = watch("category");
  const { id, name, description, sku, size, category_id } = selectedProduct;

  const submitProductMutation = useMutation({
    mutationFn: (productData) => {
      return modifyProduct(productData);
    },
  });

  // Caleb TODOs:
  // Add category.id in query in products table
  function Submit(productData) {
    submitProductMutation.mutate({ product_id: Number(id), ...productData });
    reset();
    toggleEditDialog();
  }

  function CloseDialog() {
    reset();
    toggleEditDialog();
  }

  // Populate categories from DB with useQuery
  const { data } = useQuery({
    queryKey: ["categoryData"],
    queryFn: fetchCategories,
    select: (data) => {
      return data?.data?.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    },
  });

  // const selectedCategoryId = category_id ?? "";

  useEffect(() => {
    let product = {
      name,
      description,
      sku,
      size,
      category: category_id,
    };
    reset(product);
  }, [reset, name, description, sku, size, category_id]);

  return (
    <Fragment>
      <Dialog open={editDialogOpen}>
        <Box className="title-and-close">
          <DialogTitle>Edit Product</DialogTitle>
          <CloseOutlinedIcon
            className="closed-icon"
            onClick={CloseDialog}
          ></CloseOutlinedIcon>
        </Box>
        <DialogContent className="dialog-content">
          <DialogContentText className="intro">
            To edit a product, fill out the fields below and click to save.
          </DialogContentText>
          <TextField
            {...register("name", { required: "Required" })}
            placeholder="Name"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="errors">
            {errors.name?.message}
          </Typography>
          <TextField
            {...register("description", { required: "Required" })}
            placeholder="Description"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="errors">
            {errors.description?.message}
          </Typography>
          <TextField
            {...register("sku", {
              required: "Required",
              setValueAs: (value) => Number(value), // This will convert the value to a number
            })}
            placeholder="SKU"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="errors">
            {errors.sku?.message}
          </Typography>
          <TextField
            {...register("size", { required: "Required" })}
            placeholder="Size"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="errors">
            {errors.size?.message}
          </Typography>
          <Box className="select-box">
            <FormControl className="select-form-control" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                {...register("category", { required: "Required" })}
                label="Category"
                variant="standard"
                value={category ?? ""}
                onChange={(e) => setValue("category", e.target.value)}
              >
                {data?.map((cat) => (
                  <MenuItem key={cat.category_id} value={cat.category_id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Typography variant="body1" className="errors">
            {errors.category?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            type="Submit"
            /* Margin-right does not work with this MUI component
            in an external CSS file */
            sx={{ marginRight: "20px", marginBottom: "16px" }}
            onClick={handleSubmit(Submit)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default EditProductDialog;
