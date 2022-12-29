import { Box, TextField } from '@mui/material';
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


  const [sPath, setPath] = useState(finderPath);
  const dispatch = useDispatch();


  useEffect(() => {
    checkPath(sPath);
  })
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

  function handleChange(oEvent) {
    setPath(oEvent.target.value);
    checkPath(oEvent.target.value)

  }

  return (
    <Box>
      <SettingsPanelSettingsTabPathBox bDisabled={false} bError={sCubemxfinderPathValid} sValue={sPath} fonChange={handleChange} />
      <SettingsPanelSettingsTabPathBox bDisabled={true} bError={bLocatedFileMcuDocs} sValue={finderPath + '/plugins/mcufinder/mcu/mcusDocs.json'} />
      <SettingsPanelSettingsTabPathBox bDisabled={true} bError={bLocatedFileMcuFeatures} sValue={finderPath + '/plugins/mcufinder/mcu/mcusFeaturesAndDescription.json'} />
    </Box>
  )
}

export default SettingsPanelSettingsTab