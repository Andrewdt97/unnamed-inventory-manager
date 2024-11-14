import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const AddProductButton = styled(Button)({
    color: 'white',
    backgroundColor: '#1c1c24',
    outlineColor: 'white',
    
  });

function AddProduct() {
    return (
        <AddProductButton
        variant="outlined" 
        onClick={() => {
            alert('clicked');
        }}
        size="large"
        >Add Product</AddProductButton>
    )
}

export default AddProduct;