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
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
        }),
        columnHeader: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
        }),
        row: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
          },
        }),
        footerContainer: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
        }),
      },
    },
  },
});

export default theme;