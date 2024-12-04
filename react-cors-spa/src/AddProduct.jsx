import * as React from 'react';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddProductButton from './AddProductButton';
import "./AddProductButton.css";
import "./ProductDialogue.css";
import { useForm, SubmitHandler } from "react-hook-form";

function AddProduct() {
    const [open, setOpen] = React.useState(false);
    const { register } = useForm();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <React.Fragment>
            <div class="AddProductButtonContainer">
                <AddProductButton variant="outlined" onClick={handleClickOpen} size="large">Add Product</AddProductButton>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {"Add a New Product"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <form class='productdialogue'>
                    <input name="name" placeholder='Name of Product' />
                    <input name="description" placeholder='Product Description' />
                </form>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} autoFocus>
                Submit
            </Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AddProduct;