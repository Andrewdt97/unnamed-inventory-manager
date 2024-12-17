import { Button } from "@mui/material";
import Box from '@mui/material/Box';

import "./AddProductButton.css";
import "./AddProduct.css";

function AddProduct({ onDialogue }) {
    return (
        <Box className="AddProductButtonContainer">
            <Button variant="outlined" size="large" onClick={onDialogue}>Add Product</Button>
        </Box>
    )
}

export default AddProduct;