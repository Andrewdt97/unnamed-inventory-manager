import fetchCategories from './services/CategoryServices';
import { createProduct } from './services/ProductServices';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
  } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import "./ProductDialog.css";
  
  

function ProductDialog({ openDialog, closeDialog }) {
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

    const mutation = useMutation({
        mutationFn: (data) => {
            return createProduct(data)
        }
    })

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

    return(
        <Dialog open={openDialog}>
        <Box className='titleAndButton'>
            <DialogTitle>Add Product</DialogTitle>
            <CloseOutlinedIcon className='exitButton' onClick={closeDialog}></CloseOutlinedIcon>
        </Box>
            <DialogContent>
                <DialogContentText>
                    Enter the details of the new product below.
                </DialogContentText>
                <TextField {...register("Name", { required: "Required" })} placeholder='Name' autoFocus required margin="dense" fullWidth variant="standard"/>
                <Typography variant='body1'>{errors.Name?.message}</Typography>
                <TextField {...register("SKU", { required: "Required" })} placeholder='SKU' autoFocus required margin="dense" fullWidth variant="standard"/>
                <Typography variant='body1'>{errors.SKU?.message}</Typography>
                <TextField {...register("Size", { required: "Required" })} placeholder='Size' autoFocus required margin="dense" fullWidth variant="standard"/>
                <Typography variant='body1'>{errors.Size?.message}</Typography>
                <TextField {...register("Description", { required: "Required" })} placeholder='Description' autoFocus required margin="dense" fullWidth variant="standard"/>
                <Typography variant='body1'>{errors.Description?.message}</Typography>
                <Box>
                    <FormControl variant="standard" className='categoryField'>
                        <InputLabel id="dialogCategoryLabel">Category</InputLabel>
                        <Select {...register("Category", { required: "Required" })}
                        labelId='dialogCategoryLabel'
                        defaultValue=""
                        displayEmpty
                        >
                            {data?.map(category => (
                                <MenuItem key={category.category_id} value={category.category_id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant='body1'>{errors.Category?.message}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button type="Submit" onClick={handleSubmit((data) => {
                    mutation.mutate({...data});
                    })}>Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductDialog;