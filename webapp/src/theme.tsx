import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
  },
  typography: {
    h3: {
      fontWeight: 500,
      color: '#333',
    },
    h4: {
      fontWeight: 500,
      color: '#3f51b5',
    },
  },
});

export default theme;
