import { Box, Button, Paper, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { confResetState, dispatchConfigurationProp, dispatchStateProp } from '../redux/configurationSlice'
import { ipcFileExists } from '../utilities/ipcFunctions';
import SettingsPanelSettingsTabPathBox from './SettingsPanelSettingsTabPathBox';


function SettingsPanelSettingsTab() {
  const configLoadStatus = useSelector((state) => state.configurationReducer.configLoadStatus)
  const finderPath = useSelector((state) => state.configurationReducer.configuration.sCubemxfinderpath)
  const sCubemxfinderPathValid = useSelector((state) => state.configurationReducer.sCubemxfinderPathValid)
  const bLocatedFileMcuDocs = useSelector((state) => state.configurationReducer.bLocatedFileMcuDocs)
  const bLocatedFileMcuFeatures = useSelector((state) => state.configurationReducer.bLocatedFileMcuFeatures)
  const sMxRepPathConf = useSelector((state) => state.configurationReducer.configuration.sMxRepPath)
  const sMxRepPathValid = useSelector((state) => state.configurationReducer.sMxRepPathValid)

  const [sFinderPath, setPath] = useState(finderPath);
  const [sMxRepPath, setMxRepPath] = useState(sMxRepPathConf);
  const dispatch = useDispatch();


  useEffect(() => {
    checkPathDispatch(sFinderPath, 'sCubemxfinderpath');
    checkPathDispatch(sMxRepPath, 'sMxRepPath');
  }, [sMxRepPath, sFinderPath])

  function checkPathDispatch(sPath, sConfProp) {
    ipcFileExists(sPath).then((bPathValid) => {
      if (bPathValid) {
        dispatch(dispatchConfigurationProp({ sProp: sConfProp, oValue: sPath }))
        // dispatch(dispatchStateProp({ sProp: sStateProp, oValue: sPath }));
        // dispatch(dispatchStateProp({ sProp: sPathValid, oValue: true }));
      } else {
        // dispatch(dispatchStateProp({ sProp: sPathValid, oValue: false }));
      }
    })
  }

  function handleFinderPathChange(oEvent) {
    const sPath = oEvent.target.value;
    setPath(sPath);
    checkPathDispatch(sPath, 'sCubemxfinderpath');
  }

  function handleMxRepositroryPathChange(oEvent) {
    const sPath = oEvent.target.value;
    setMxRepPath(sPath);
    checkPathDispatch(sPath, 'sMxRepPath');
  }

  function handleButton() {
    dispatch(confResetState());
  }

  return (
    <Box>
      <Stack spacing={2}>
        <Button onClick={handleButton}>Refresh Settings</Button>
        <Paper>

          Path to .mcufinder
          <SettingsPanelSettingsTabPathBox bDisabled={false} bError={sCubemxfinderPathValid} sValue={sFinderPath} fonChange={handleFinderPathChange} sLabel={"Path to .stmcufinder"} />
          <SettingsPanelSettingsTabPathBox bDisabled={true} bError={bLocatedFileMcuDocs} sValue={finderPath + '/plugins/mcufinder/mcu/cube-finder-db.db'} sLabel={"Derivated path to cube-finder-db.db database file"} />
        </Paper>
        <Paper>
          Path to CubeMX repository
          <SettingsPanelSettingsTabPathBox bDisabled={false} bError={sMxRepPathValid} sValue={sMxRepPath} fonChange={handleMxRepositroryPathChange} sLabel={"CubeMX repository folder"} />
        </Paper>
      </Stack>
    </Box>
  )
}

export default SettingsPanelSettingsTab