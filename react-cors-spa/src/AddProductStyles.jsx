import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const AddProductButton = styled(Button)({
    color: 'white',
    backgroundColor: '#1c1c24',
    borderColor: 'grey',
    '&:hover': {
    backgroundColor: '#24242e',
    boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)',
  },
  });


export default AddProductButton;