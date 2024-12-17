import { Button } from "@mui/material";
import Box from '@mui/material/Box';

import "./AddProductButton.css";
import "./AddProduct.css";

function AddProduct({ onDialogOpen }) {
    return (
        <Box className="AddProductButtonContainer">
            <Button variant="outlined" size="large" onClick={onDialogOpen}>Add Product</Button>
        </Box>
    )
}

export default AddProduct;