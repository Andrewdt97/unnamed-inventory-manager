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
  const [number, setNumber] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(number);
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
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
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
