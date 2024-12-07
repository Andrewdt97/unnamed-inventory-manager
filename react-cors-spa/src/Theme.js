import { createTheme } from '@mui/material';

/*
COLOR GUIDE
Dark teal - #133236
Not as dark teal - #1a4348
Yellow - #996d1f
Red - #b35090
*/

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#133236',
      paper: '#1a4348',
    },
    primary: {
      main: '#996d1f',
    },
    secondary: {
      main: '##4a3134',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a4348",
        },
        columnHeader: {
          backgroundColor: '#996d1f',
        },
        row: {
          '&:hover': {
            backgroundColor: '#4a3134',
          },
        },
        footerContainer: {
          backgroundColor: '#996d1f',
        },
      },
    },
  },
});

export default theme;