// Material-UI Theme customization
import { createTheme } from "@material-ui/core";

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      light: '#F0F5FE',
      main: '#1050C6',
      dark: '#3171F2',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FBD6C4',
      main: '#F69A6C',
      dark: '#F27131',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      'Roboto Mono',
      'monospace'
    ].join(','),
    h1: {
      fontSize: 30,
      padding: "16px",
    },
    h2: {
      fontSize: 20,
      padding: "16px",
    },
    body2: {
      fontSize: 12,
      paddingTop: "40px"
    }
  },
});

export default theme;