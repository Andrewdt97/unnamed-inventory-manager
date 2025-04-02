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
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import "./EditProductDialog.css";

function EditProductDialog({ toggleEditDialog, editDialogOpen }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name);
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
        <DialogContent>
          <DialogContentText>
            To edit a product, fill out the fields below and click to save.
          </DialogContentText>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
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
