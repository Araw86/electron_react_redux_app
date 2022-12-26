import React, { Component } from "react";
import { Box, Button } from '@mui/material';


import { Provider } from 'react-redux';
import { store } from './redux/store';
import SetupInfoPanel from "./components/SetupInfoPanel";

/*theming */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/*fonts*/
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { version: null };
    this.handleClick = this.handleClick.bind(this);
    ipc_handlers.ipcToRenderer((event, value) => console.log('Received msg' + value));
  }

  async componentDidMount() {
    const version = await ipc_handlers.ipcTwoWay({ type: 0 });
    this.setState({ version: version });
  }

  handleClick() {
    ipc_handlers.ipcToMain('test text');
  }
  render() {

    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Provider store={store}>
          <Box>
            <Box>
              test2
              <br />
              {this.state.version}
            </Box>
            <Button onClick={this.handleClick} variant="contained">button</Button>
          </Box>
          <Box>
            <SetupInfoPanel />
          </Box>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;