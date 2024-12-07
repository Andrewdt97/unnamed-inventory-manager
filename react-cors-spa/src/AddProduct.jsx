import * as React from 'react';

import { Button, Skeleton } from "@mui/material";
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

    const { register, handleSubmit, watch, formState: {errors} } = useForm({
        defaultValues: {
            Name: "",
            SKU: "",
            Size: "",
            Description: "",
            Category: "Category",
        }
    });

    console.log(watch());

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    // Caleb TODO:
    // Make sure there's a clear error message displayed to the user for the minimum character
    // count. 

    if(loading) {
        return (
            <div className="addProductSkeleton">
                <Skeleton variant="rounded" width={160} height={75} />
            </div>
        )
    }
    return (
        <React.Fragment>
            <div className="AddProductButtonContainer">
                <Button variant="outlined" onClick={handleClickOpen} size="large">Add Product</Button>
            </div>
            <Dialog open={open}>
                <div className='titleAndButton'>
                    <DialogTitle>Add Product</DialogTitle>
                    <Button onClick={handleClose}>X</Button>
                </div>
                    <DialogContent>
                        <DialogContentText>
                            Enter the details of the new product below.
                        </DialogContentText>
                        <TextField {...register("Name", { required: "Required", minLength: { value: 4, message: "Min length is 4" } })} placeholder='Name' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <p>{errors.Name?.message}</p>
                        <TextField {...register("SKU", { required: "Required", minLength: { value: 8, message: "Min length is 8" } })} placeholder='SKU' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <p>{errors.SKU?.message}</p>
                        <TextField {...register("Size", { required: "Required", minLength: { value: 3, message: "Min length is 3" } })} placeholder='Size' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <p>{errors.Size?.message}</p>
                        <TextField {...register("Description", { required: "Required", minLength: { value: 10, message: "Min length is 10" } })} placeholder='Description' autoFocus required margin="dense" fullWidth variant="standard"/>
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