import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const AddProductButton = styled(Button)({
    color: 'white',
    backgroundColor: '#1c1c24',
    textTransform: 'none',
    borderColor: 'grey',
    '&:hover': {
    backgroundColor: '#24242e',
  },
  });

function AddProduct() {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <AddProductButton
            variant="outlined" 
            onClick={() => {
                alert('clicked');
            }}
            size="large"
            >Add Product</AddProductButton>
        </div>
    )
}

export default AddProduct;