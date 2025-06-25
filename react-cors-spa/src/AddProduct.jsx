import { Box, Button } from "@mui/material";
import "./AddProductButton.css";
import "./AddProduct.css";

function AddProduct({ toggleDialogOpen }) {
  return (
    <Box className="AddProductButtonContainer">
      <Button variant="outlined" size="large" onClick={toggleDialogOpen}>
        Add Product
      </Button>
    </Box>
  );
}

export default AddProduct;
