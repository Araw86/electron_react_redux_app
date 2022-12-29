import React, { Component, useEffect, useState } from "react";
import { Box, Button } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'

import SettingsPanel from "./SettingsPanel";

import { dispatchConfiguration, confResetState } from '../redux/configurationSlice'

import { configurationLoad, configurationSave } from '../utilities/configLoad'

import { useMcuDocs, useMcuFeatures } from "./hooks/useMcuFiles";

function AppWindows() {

  const dispatch = useDispatch();
  const [version, setVersion] = useState(null);
  const configLoadStatus = useSelector((state) => state.configurationReducer.configLoadStatus)
  const oConfiguration = useSelector((state) => state.configurationReducer.configuration)
  const oState = useSelector((state) => state.configurationReducer)
  console.log(oState);
  useEffect(() => {
    if (configLoadStatus === 0) {
      configurationLoad((configuration) => {
        dispatch(dispatchConfiguration({ configLoadStatus: 1, configuration: configuration }))
      });
    }
  });

  /* handle the configuration change */
  useEffect(() => {
    /*config changes */
    console.log('config changes');
    console.log(oConfiguration);
    /*store config */
    configurationSave(oConfiguration);
    dispatch(confResetState());
  }, [dispatch, oConfiguration]);

  useMcuDocs();
  useMcuFeatures();
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
        <SettingsPanel />
      </Box>
    </Box>
  )
}

export default AppWindows;