import React, { Component } from "react";
import { Box } from '@mui/material';

import { Provider } from 'react-redux';
import { store } from './redux/store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { version: null };
  }

  async componentDidMount() {
    const version = await window.ipc_handlers.ipc_twoWay({ type: 0 });
    this.setState({ version: version });
  }
  render() {

    return (
      <Provider store={store}>
        <Box>
          test2
          <br />
          {this.state.version}
        </Box>
      </Provider>
    );
  }
}

export default App;