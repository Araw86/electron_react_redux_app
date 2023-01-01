import React from 'react'
import { AppBar, Box, Button, Grid, Tab, Tabs, TextField, Toolbar } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'
import useMcuDoc from './useMcuDoc';
import DocPanelMcuDevice from './DocPanelMcuDevice';

import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Stack } from '@mui/system';

function DocPanel() {

  const mcuInfo = useMcuDoc();
  console.log(mcuInfo);
  let jMcuDevices = [];
  if (mcuInfo !== null) {
    Object.keys(mcuInfo.line).forEach(sKey => {
      const oLine = mcuInfo.line[sKey]
      jMcuDevices.push(<DocPanelMcuDevice key={oLine.line} oLine={oLine} mcuDoc={mcuInfo.mcuDoc} />);
    });
  }
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={1}>

            <SearchIcon />
            <TextField size="small"></TextField>
            <BackspaceIcon />
          </Stack>
        </Toolbar>

      </AppBar>
      <Grid container justifyContent="center" spacing={2}>
        {jMcuDevices}
      </Grid>
    </Box>
  )
}

export default DocPanel