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
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      size: "",
    },
  });

  const { id, name, description, sku, size } = selectedProduct;

  const submitProductMutation = useMutation({
    mutationFn: (productData) => {
      return modifyProduct(productData);
    },
  });

  // Caleb TODOs:
  // Add category.id in query in products table
  function Submit(productData) {
    console.log({ product_id: id, ...productData });
    submitProductMutation.mutate({ product_id: Number(id), ...productData });
    reset();
    toggleEditDialog();
  }

  function CloseDialog() {
    reset();
    toggleEditDialog();
  }

  useEffect(() => {
    reset({ name, description, sku, size });
  }, [name, description, sku, size, reset]);

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
                {...register("category_id", { required: "Required" })}
                label="Category"
                variant="standard"
                defaultValue=""
                /* React requires a default value for this component
                set as a prop and not within useForm,
                otherwise you will receive the error, 
                "You have provided an out-of-range value undefined for 
                the select (name="category") component.
                Consider providing a value that matches 
                one of the available options or ''."
                */
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
