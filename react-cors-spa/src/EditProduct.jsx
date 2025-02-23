import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Fragment, useState } from "react";

function EditProduct({ editProduct, ...props}) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Make Product Changes</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                These are permanent changes
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                setOpen(false);
                editProduct();
              }}
              color="warning"
              autoFocus
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
    </Fragment>
  )
}

export default EditProduct;