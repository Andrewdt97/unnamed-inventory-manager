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
            {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
                Agree
            </Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AddProduct;