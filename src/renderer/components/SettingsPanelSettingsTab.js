import { Box, Paper, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { dispatchConfigurationProp, dispatchStateProp } from '../redux/configurationSlice'
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

  const [sPath, setPath] = useState(finderPath);
  const [sMxRepPath, setMxRepPath] = useState(sMxRepPathConf);
  const dispatch = useDispatch();


  useEffect(() => {
    checkPath(sPath);
    checkMxRepPath(sMxRepPath);
  }, [sMxRepPath, sPath])
  function checkPath(sPath) {
    ipcFileExists(sPath).then((bPathValid) => {
      if (bPathValid) {
        dispatch(dispatchConfigurationProp({ sProp: 'sCubemxfinderpath', oValue: sPath }))
        dispatch(dispatchStateProp({ sProp: 'sCubemxfinderPathValid', oValue: true }));
      } else {
        dispatch(dispatchStateProp({ sProp: 'sCubemxfinderPathValid', oValue: false }));
      }
    })
  }

  function checkMxRepPath(sPath) {
    ipcFileExists(sPath).then((bPathValid) => {
      if (bPathValid) {
        dispatch(dispatchConfigurationProp({ sProp: 'sMxRepPath', oValue: sPath }))
        dispatch(dispatchStateProp({ sProp: 'sMxRepPathValid', oValue: true }));
      } else {
        dispatch(dispatchStateProp({ sProp: 'sMxRepPathValid', oValue: false }));
      }
    })
  }

  function handleChange(oEvent) {
    setPath(oEvent.target.value);
    checkPath(oEvent.target.value)

  }

  function handleMxRepositrory(oEvent) {
    setMxRepPath(oEvent.target.value);
    checkMxRepPath(oEvent.target.value)
  }

  return (
    <Box>
      <Stack spacing={2}>

        <Paper>

          Path to .mcufinder
          <SettingsPanelSettingsTabPathBox bDisabled={false} bError={sCubemxfinderPathValid} sValue={sPath} fonChange={handleChange} sLabel={"Path to .stmcufinder"} />
          <SettingsPanelSettingsTabPathBox bDisabled={true} bError={bLocatedFileMcuDocs} sValue={finderPath + '/plugins/mcufinder/mcu/mcusDocs.json'} sLabel={"Derivated path to mcusDocs.json"} />
          <SettingsPanelSettingsTabPathBox bDisabled={true} bError={bLocatedFileMcuFeatures} sValue={finderPath + '/plugins/mcufinder/mcu/mcusFeaturesAndDescription.json'} sLabel={"Derivated path to mcusFeaturesAndDescription.json"} />
        </Paper>
        <Paper>
          Path to CubeMX repository
          <SettingsPanelSettingsTabPathBox bDisabled={false} bError={sMxRepPathValid} sValue={sMxRepPath} fonChange={handleMxRepositrory} sLabel={"CubeMX repository folder"} />
        </Paper>
      </Stack>
    </Box>
  )
}

export default SettingsPanelSettingsTab