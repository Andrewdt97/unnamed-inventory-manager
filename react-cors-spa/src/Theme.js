import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#1c1c24'
        },
      },
    },
    MuiDialogTitle: {
      fontSize: '1.5rem'
    },
    MuiDialogContentText: {
          fontSize: '1.25rem'
    }
  }
});

export default theme;