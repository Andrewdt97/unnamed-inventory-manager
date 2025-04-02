import { useState } from "react";
import * as React from "react";
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
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import "./EditProductDialog.css";

const testCategories = [
  "Shirts",
  "Shoes",
  "Hats",
  "Pants",
  "Jewelry",
  "Glasses",
  "Pins",
  "Dresses",
  "Skirts",
  "Scarfs",
  "Coats",
  "Jackets",
];

function EditProductDialog({ toggleEditDialog, editDialogOpen }) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Verify form completion with formState
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     name: "",
  //     sku: "",
  //     size: "",
  //     description: "",
  //     category_id: "Category",
  //   },
  // });

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, sku, size, description, category });
    toggleEditDialog();
  }

  return (
    <React.Fragment>
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
            placeholder="Name"
            required
            value={name}
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            placeholder="SKU"
            required
            value={sku}
            fullWidth
            variant="standard"
            onChange={(e) => setSku(e.target.value)}
          ></TextField>
          <TextField
            placeholder="Size"
            required
            value={size}
            fullWidth
            variant="standard"
            onChange={(e) => setSize(e.target.value)}
          ></TextField>
          <TextField
            placeholder="Description"
            required
            value={description}
            fullWidth
            variant="standard"
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>
          <Box className="select-box">
            <FormControl className="select-form-control" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                {testCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditProductDialog;
