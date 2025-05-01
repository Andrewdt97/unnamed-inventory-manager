import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import modifyProduct from "./services/ProductService";
import "./EditProductDialog.css";
import SelectCategory from "./SelectCategory";

function EditProductDialog({
  toggleEditDialog,
  editDialogOpen,
  selectedProduct,
  refetch,
}) {
  const {
    id = null,
    name,
    description,
    size,
    sku,
    category_id,
  } = selectedProduct;

  const [sure, setSure] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const submitProductMutation = useMutation({
    mutationFn: ({ product_id, productData }) => {
      return modifyProduct(product_id, productData);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  function Submit(productData) {
    refetch();
    console.log({
      product_id: id,
      productData: {
        ...productData,
        category_id: productData.category_id,
      },
    });
    submitProductMutation.mutate({
      product_id: id,
      productData: {
        ...productData,
        category_id: productData.category_id,
      },
    });
    reset();
    toggleEditDialog();
    setSure(false);
  }

  function CloseDialog() {
    reset();
    toggleEditDialog();
    setSure(false);
  }

  useEffect(() => {
    const product = {
      name,
      description,
      sku,
      size,
      category_id,
    };
    reset(product);
  }, [reset, name, description, sku, size, category_id]);

  return (
    <Fragment>
      <Dialog open={editDialogOpen}>
        <Box className="title-and-close">
          <DialogTitle>Edit Product</DialogTitle>
          <CloseOutlinedIcon
            className="closed-icon"
            onClick={CloseDialog}
          ></CloseOutlinedIcon>
        </Box>
        <DialogContent className="dialog-content">
          <DialogContentText className="intro">
            To edit a product, fill out the fields below and click to save.
          </DialogContentText>
          <TextField
            {...register("name", { required: "Required" })}
            placeholder="Name"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="errors">
            {errors.name?.message}
          </Typography>
          <TextField
            {...register("description", { required: "Required" })}
            placeholder="Description"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="errors">
            {errors.description?.message}
          </Typography>
          <TextField
            {...register("sku", {
              required: "Required",
              setValueAs: (value) => Number(value), // This will convert the value to a number
            })}
            placeholder="SKU"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="errors">
            {errors.sku?.message}
          </Typography>
          <TextField
            {...register("size", { required: "Required" })}
            placeholder="Size"
            required
            fullWidth
            variant="standard"
          ></TextField>
          <Typography variant="body1" className="errors">
            {errors.size?.message}
          </Typography>
          <SelectCategory category_id={category_id} control={control} />
          <Typography variant="body1" className="errors">
            {errors.category?.message}
          </Typography>
        </DialogContent>
        <DialogActions
          /* External CSS does not work on DialogActions */
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!sure && (
            <Box className="init-save-btn">
              <Button
                onClick={() => setSure(true)}
                /* Margin-right does not work with this MUI component
              in an external CSS file */
                sx={{ marginRight: "20px", marginBottom: "16px" }}
              >
                Save
              </Button>
            </Box>
          )}
          {sure && (
            <Box className="sure-box">
              <Typography variant="body1">Confirm Changes?</Typography>
              <Box className="sure-yes-no">
                <Button
                  type="Submit"
                  onClick={handleSubmit((data) => Submit(data))}
                >
                  Yes
                </Button>
                <Button onClick={() => setSure(false)}>No</Button>
              </Box>
            </Box>
          )}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default EditProductDialog;
