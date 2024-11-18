import * as React from 'react';
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddProductButton = styled(Button)({
    color: 'white',
    backgroundColor: '#1c1c24',
    borderColor: 'grey',
    '&:hover': {
    backgroundColor: '#24242e',
    boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)',
  },
  });

function AddProduct() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
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
                <form>
                    <label>Product Name</label><br></br>
                    <input type='text'></input><br></br>
                    <label>Product Description</label><br></br>
                    <input type='text'></input><br></br>
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