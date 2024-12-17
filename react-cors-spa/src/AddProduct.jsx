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
import fetchCategories from './services/CategoriesService';

import "./AddProductButton.css";
import "./ProductDialogue.css";
import "./AddProduct.css";

import { useQuery } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

function AddProduct() {
    // Handle open/close of dialogue with useState
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    // Handle category selection in dialogue with useState
    const [category, setCategory] = React.useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
    }
    
    // Populate categories from DB with useQuery
    const { data } = useQuery({
        queryKey: ['categoryData'],
        queryFn: fetchCategories,
        select: (data) => {
            return data?.data?.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                return 0;
              });        
        }
    });

    // Verify form completion with formState
    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
            Name: "",
            SKU: "",
            Size: "",
            Description: "",
            Category: "Category",
        }
    });

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
                        <TextField {...register("Name", { required: "Required" })} placeholder='Name' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <p>{errors.Name?.message}</p>
                        <TextField {...register("SKU", { required: "Required" })} placeholder='SKU' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <p>{errors.SKU?.message}</p>
                        <TextField {...register("Size", { required: "Required" })} placeholder='Size' autoFocus required margin="dense" fullWidth variant="standard"/>
                        <p>{errors.Size?.message}</p>
                        <TextField {...register("Description", { required: "Required" })} placeholder='Description' autoFocus required margin="dense" fullWidth variant="standard"/>
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
                                    {data?.map(category => (
                                        <MenuItem key={category.category_id} value={category.category_id}>{category.name}</MenuItem>
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