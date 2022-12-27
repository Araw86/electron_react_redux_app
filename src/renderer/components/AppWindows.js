import React, { Component, useEffect, useState } from "react";
import { Box, Button } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'

import SetupInfoPanel from "./SetupInfoPanel";

import { dispatchConfiguration } from '../redux/configurationSlice'

import { configurationLoad } from '../utilities/configLoad'

function AppWindows() {

  const [version, setVersion] = useState(null);
  const configLoadStatus = useSelector((state) => state.configurationReducer.configLoadStatus)

  const dispatch = useDispatch();

  useEffect(() => {
    if (configLoadStatus === 0) {
      configurationLoad((configuration) => {
        dispatch(dispatchConfiguration({ configLoadStatus: 1, configuration: configuration }))
      });
    }




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