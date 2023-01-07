import React, { useEffect, useRef } from 'react'
import { AppBar, Box, Button, Grid, Tab, Tabs, TextField, Toolbar } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'
import useMcuDoc from './useMcuDoc';
import DocPanelMcuDevice from './DocPanelMcuDevice';


import { Stack } from '@mui/system';
import DocPanelSearch from './DocPanelSearch';

function DocPanel() {
  const boxRef = useRef(null);
  const sDocFilterDevice = useSelector((state) => state.configurationReducer.sDocFilterDevice);


  const mcuInfo = useSelector((state) => state.configurationReducer.oSqlParsedData);


  let jMcuDevices = [];
  let filteredLines = {};
  if (mcuInfo !== null) {
    if (sDocFilterDevice !== '') {
      const aDevices = Object.keys(mcuInfo.device);
      filteredLines = aDevices.reduce((oReducedLines, sDevice) => {
        if (sDevice.search(sDocFilterDevice.toUpperCase()) !== -1) {
          oReducedLines[mcuInfo.device[sDevice].line] = true;
        }
        return oReducedLines;
      }, {})
    } else {
      filteredLines = mcuInfo.line;
    }

    Object.keys(filteredLines).forEach(sKey => {
      const oLine = mcuInfo.line[sKey]
      jMcuDevices.push(<DocPanelMcuDevice key={oLine.line} oLine={oLine} mcuDoc={mcuInfo.mcuDoc} />);
    });
  }
  let appBarSx;
  if ((boxRef.current !== null) && (boxRef.current.offsetWidth !== null)) {
    appBarSx = { width: `calc(100% - ${boxRef.current.offsetLeft}px)`, ml: `${boxRef.current.offsetLeft}px` }
  } else {
    appBarSx = { width: '100%' }
  }
  return (
    <Box ref={boxRef}>
      <AppBar position="fixed" sx={{ ...appBarSx }}>
        <Toolbar>
          <DocPanelSearch />
        </Toolbar>

      </AppBar>
      <Box m={1}>
        <Toolbar />
        <Grid container justifyContent="center" spacing={2}>
          {jMcuDevices}
        </Grid>
      </Box>
    </Box>
  )
}

export default DocPanel