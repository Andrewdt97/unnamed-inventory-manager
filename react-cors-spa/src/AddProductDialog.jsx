import fetchCategories from "./services/CategoryServices";
import { createProduct } from "./services/ProductsService";
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
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import "./AddProductDialog.css";

function AddProductDialog({ isDialogOpen, toggleDialogClose }) {
  // Populate categories from DB with useQuery
  const { data } = useQuery({
    queryKey: ["categoryData"],
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
    },
  });

  const submitProductMutation = useMutation({
    mutationFn: (productData) => {
      return createProduct(productData);
    },
  });

  // Verify form completion with formState
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      sku: 0,
      size: "",
      description: "",
      category_id: "Category",
    },
  });

  function Submit(productData) {
    submitProductMutation.mutate({ ...productData });
    toggleDialogClose();
  }

  return (
    <Dialog open={isDialogOpen}>
      <Box className="titleAndButton">
        <DialogTitle>Add Product</DialogTitle>
        <CloseOutlinedIcon
          className="exitButton"
          onClick={toggleDialogClose}
        ></CloseOutlinedIcon>
      </Box>
      <DialogContent>
        <DialogContentText>
          Enter the details of the new product below.
        </DialogContentText>
        <TextField
          {...register("name", { required: "Required" })}
          placeholder="Name"
          autoFocus
          required
          margin="dense"
          fullWidth
          variant="standard"
        />
        <Typography variant="body1">{errors.name?.message}</Typography>
        <TextField
          {...register("sku", { required: "Required" })}
          placeholder="SKU"
          autoFocus
          required
          margin="dense"
          fullWidth
          variant="standard"
        />
        <Typography variant="body1">{errors.sku?.message}</Typography>
        <TextField
          {...register("size", { required: "Required" })}
          placeholder="Size"
          autoFocus
          required
          margin="dense"
          fullWidth
          variant="standard"
        />
        <Typography variant="body1">{errors.size?.message}</Typography>
        <TextField
          {...register("description", { required: "Required" })}
          placeholder="Description"
          autoFocus
          required
          margin="dense"
          fullWidth
          variant="standard"
        />
        <Typography variant="body1">{errors.description?.message}</Typography>
        <Box>
          <FormControl variant="standard" className="categoryField">
            <InputLabel id="dialogCategoryLabel">Category</InputLabel>
            <Select
              {...register("category_id", { required: "Required" })}
              labelId="dialogCategoryLabel"
              defaultValue=""
              displayEmpty
            >
              {data?.map((category) => (
                <MenuItem
                  key={category.category_id}
                  value={category.category_id}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body1">{errors.category?.message}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type="Submit" onClick={handleSubmit(Submit)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductDialog;
