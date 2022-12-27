import React, { Component, useEffect, useState } from "react";
import { Box, Button } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'

import SetupInfoPanel from "./SetupInfoPanel";

import { dispatchConfiguration } from '../redux/configurationSlice'

function AppWindows() {

  const [version, setVersion] = useState(null);
  const configLoadStatus = useSelector((state) => state.configurationReducer.configLoadStatus)

  const dispatch = useDispatch();

  useEffect(() => {
    if (configLoadStatus === 0) {

      dispatch(dispatchConfiguration({ configLoadStatus: 1, configuration: null }))
    }



    async function ipcTwoWay() {
      let ipcVersion = await ipc_handlers.ipcTwoWay({ type: 0 });
      setVersion(ipcVersion);
    }
    ipcTwoWay();
  });

  function handleClick() {
    ipc_handlers.ipcToMain('test text');
  }
  return (
    <Box>
      <Box>
        <Box>
          test2
          <br />
          {version}
        </Box>
        <Button onClick={handleClick} variant="contained">button</Button>
      </Box>
      <Box>
        <SetupInfoPanel />
      </Box>
    </Box>
  )
}

export default AppWindows;