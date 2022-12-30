import React from "react";



import { Provider } from 'react-redux';
import { store } from './redux/store';


/*theming */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/*fonts*/
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import AppWindows from "./components/AppWindows";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  primary: {
    main: '#5893df',
  },
  secondary: {
    main: '#2ec5d3',
  },
  background: {
    default: '#192231',
    paper: '#24344d',
  },
});


export default function App() {


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <AppWindows />
      </Provider>
    </ThemeProvider>
  )
}
