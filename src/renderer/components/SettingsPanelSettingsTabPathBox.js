import { Stack, TextField } from '@mui/material'
import React from 'react'

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';

function SettingsPanelSettingsTabPathBox({ fonChange = null, bDisabled = false, bError, sValue }) {
  let errorDisplay;
  let icon;
  if (bError) {
    errorDisplay = {};
    icon = (<CheckIcon color="success" />)
  } else {

    errorDisplay = { error: true };
    icon = (<CloseIcon color="error" />)
  }
  let disabledProp = { disabled: false };
  if (bDisabled) {
    disabledProp = { disabled: true };
  }

  function handleChange(event) {
    fonChange(event);
  }
  return (
    <Box m={2}>

      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField {...errorDisplay} {...disabledProp} size="small" label="Path to .stmcufinder" fullWidth value={sValue} onChange={handleChange}></TextField>
        {icon}
      </Stack>
    </Box>
  )
}

export default SettingsPanelSettingsTabPathBox