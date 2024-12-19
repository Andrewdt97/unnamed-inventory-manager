import { Box, Button } from "@mui/material";
import "./AddProductButton.css";
import "./AddProduct.css";

function AddProduct({ triggerDialog }) {
    return (
        <Box className="AddProductButtonContainer">
            <Button variant="outlined" size="large" onClick={triggerDialog}>Add Product</Button>
        </Box>
    )
}

export default AddProduct;