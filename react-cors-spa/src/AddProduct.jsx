import * as React from 'react';

import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

import AddProductButton from './AddProductButton';
import "./AddProductButton.css";
import "./ProductDialogue.css";

function AddProduct() {
    const [open, setOpen] = React.useState(false);
    const categories = [
        'Shirts',
        'Pants',
        'Shoes',
        'Hats',
        'Jewelry'
    ];

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    }


    // Caleb TODO:
    // Add list to pick the category from, checkout MUI's options that are not an ugly radio button
    return (
        <React.Fragment>
            <div className="AddProductButtonContainer">
                <AddProductButton variant="outlined" onClick={handleClickOpen} size="large">Add Product</AddProductButton>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the details of the new product below.
                        </DialogContentText>
                        <TextField placeholder='Name' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <TextField placeholder='SKU' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <TextField placeholder='Size' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <TextField placeholder='Description' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <Box sx={{ minWidth: 120 , paddingTop: 1}}>
                            <FormControl fullWidth>
                                <Select value={category} 
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                >
                                <MenuItem value="">Category</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type="Submit">Submit</Button>
                    </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AddProduct;