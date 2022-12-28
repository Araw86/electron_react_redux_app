import { Box, TextField } from '@mui/material';
import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { dispatchConfigurationProp } from '../redux/configurationSlice'
import { ipcFileExists } from '../utilities/ipcFunctions';


function SettingsPanelSettingsTab() {
  const configLoadStatus = useSelector((state) => state.configurationReducer.configLoadStatus)
  const finderPath = useSelector((state) => state.configurationReducer.configuration.sCubemxfinderpath)

  const [sPath, setPath] = useState(finderPath);
  const dispatch = useDispatch();

  function handleChange(oEvent) {
    setPath(oEvent.target.value);
    ipcFileExists(oEvent.target.value).then((bPathValid) => {
      if (bPathValid) {
        dispatch(dispatchConfigurationProp({ sProp: 'sCubemxfinderpath', oValue: oEvent.target.value }))
      }
    })

  }

  return (
    <Box>
      {(configLoadStatus === 1) ? (<TextField size="small" label="Path to .stmcufinder" fullWidth value={sPath} onChange={handleChange}></TextField>) : <Box>    </Box>}
    </Box>
  )
}

export default SettingsPanelSettingsTab