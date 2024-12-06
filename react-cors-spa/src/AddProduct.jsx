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
import Box from '@mui/material/Box';

import AddProductButton from './AddProductButton';
import "./AddProductButton.css";
import "./ProductDialogue.css";
import "./AddProduct.css";

import { useForm } from 'react-hook-form';

function AddProduct() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const categories = [
        'Shirts',
        'Pants',
        'Shoes',
        'Hats',
        'Jewelry'
    ];
    const [category, setCategory] = React.useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
    }

    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
            Name: "",
            SKU: "",
            Size: "",
            Description: "",
            Category: "Category",
        }
    });

    console.log(errors);

    // Caleb TODO:
    // Make sure there's a clear error message displayed to the user for the minimum character
    // count. 

    return (
        <React.Fragment>
            <div className="AddProductButtonContainer">
                <AddProductButton variant="outlined" onClick={handleClickOpen} size="large">Add Product</AddProductButton>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <div className='titleAndButton'>
                    <DialogTitle>Add Product</DialogTitle>
                    <Button onClick={handleClose}>X</Button>
                </div>
                    <DialogContent>
                        <DialogContentText>
                            Enter the details of the new product below.
                        </DialogContentText>
                        <TextField {...register("Name", { required: "Required", minLength: 4 })} placeholder='Name' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <p>{errors.Name?.message}</p>
                        <TextField {...register("SKU", { required: "Required", minLength: 8 })} placeholder='SKU' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <p>{errors.SKU?.message}</p>
                        <TextField {...register("Size", { required: "Required", minLength: 3 })} placeholder='Size' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <p>{errors.Size?.message}</p>
                        <TextField {...register("Description", { required: "Required", minLength: 10 })} placeholder='Description' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <p>{errors.Description?.message}</p>
                        <Box sx={{ minWidth: 120 , paddingTop: 1}}>
                            <FormControl>
                                <Select {...register("Category", { required: "Required" })}
                                value={category} 
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
                            <p>{errors.Category?.message}</p>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button type="Submit" onClick={handleSubmit((data) => {
                            console.log(data);
                            })}>Submit
                        </Button>
                    </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default AddProduct;