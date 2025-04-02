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
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import "./EditProductDialog.css";

const testCategories = [
  "shirts",
  "shoes",
  "hats",
  "pants",
  "jewelry",
  "glasses",
  "pins",
  "dresses",
  "skirts",
  "scarfs",
  "coats",
  "jackets",
];

function EditProductDialog({ toggleEditDialog, editDialogOpen }) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, sku, size, description, category });
    toggleEditDialog();
  }

  /* <p>Testing</p>
      <form method="dialog" onSubmit={handleSubmit}>
        <label>Enter a number</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">OK</button>
      </form> */

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
          <Box>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {testCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
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
