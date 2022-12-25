import React, { Component } from "react";
import { Box, Button } from '@mui/material';


import { Provider } from 'react-redux';
import { store } from './redux/store';

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
      <Provider store={store}>
        <Box>
          test2
          <br />
          {this.state.version}
        </Box>
        <Button onClick={this.handleClick} variant="contained">button</Button>
      </Provider>
    );
  }
}

export default App;