import { Fragment } from "react";
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

import "./EditProductDialog.css";

const testCategories = [
  { name: "Shirts", id: 1 },
  { name: "Shoes", id: 2 },
  { name: "Hats", id: 3 },
  { name: "Pants", id: 4 },
  { name: "Jewelry", id: 5 },
  { name: "Glasses", id: 6 },
  { name: "Pins", id: 7 },
  { name: "Dresses", id: 8 },
  { name: "Skirts", id: 9 },
  { name: "Scarfs", id: 10 },
  { name: "Coats", id: 11 },
  { name: "Jackets", id: 12 },
];

function EditProductDialog({
  toggleEditDialog,
  editDialogOpen,
  selectedProduct,
}) {
  console.log(selectedProduct);
  /*
  Example of selectProduct object being passed
  Object { 
    id: 6, 
    name: "hat", 
    description: "pirates baseball cap", 
    sku: 95959595, 
    size: "Men's Large", 
    sold_date: null 
  }
  */
  const { id, name, description, sku, size } = selectedProduct;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      size: "",
    },
  });

  function Submit(productData) {
    console.log({ id: id, ...productData });
    toggleEditDialog();
  }

  return (
    <Fragment>
      <Dialog open={editDialogOpen}>
        <Box className="title-and-close">
          <DialogTitle>Edit Product</DialogTitle>
          <CloseOutlinedIcon
            className="closed-icon"
            onClick={toggleEditDialog}
          ></CloseOutlinedIcon>
        </Box>
        <DialogContent className="dialog-content">
          <DialogContentText>
            To edit a product, fill out the fields below and click to save.
          </DialogContentText>
          <TextField
            {...register("name", { required: "Required" })}
            placeholder="Name"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="current-value">
            Current Name: {name}
          </Typography>
          <Typography variant="body1">{errors.name?.message}</Typography>
          <TextField
            {...register("description", { required: "Required" })}
            placeholder="Description"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="current-value">
            Current Description: {description}
          </Typography>
          <Typography variant="body1">{errors.description?.message}</Typography>
          <TextField
            {...register("sku", { required: "Required" })}
            placeholder="SKU"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="current-value">
            Current SKU: {sku}
          </Typography>
          <Typography variant="body1">{errors.sku?.message}</Typography>
          <TextField
            {...register("size", { required: "Required" })}
            placeholder="Size"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="current-value">
            Current Size: {size}
          </Typography>
          <Typography variant="body1">{errors.size?.message}</Typography>
          <Box className="select-box">
            <FormControl className="select-form-control" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                {...register("category", { required: "Required" })}
                label="Category"
                /* React requires a default value for this component
                otherwise you will receive the error, 
                "You have provided an out-of-range value undefined for 
                the select (name="category") component.
                Consider providing a value that matches 
                one of the available options or ''."
                */
              >
                {testCategories.map((cat) => (
                  <MenuItem key={cat.name} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body1">{errors.category?.message}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="Submit" onClick={handleSubmit(Submit)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default EditProductDialog;
