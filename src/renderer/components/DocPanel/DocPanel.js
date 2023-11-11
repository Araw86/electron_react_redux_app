import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AppBar, Box, Button, Grid, IconButton, Tab, Tabs, TextField, Toolbar } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'
import useMcuDoc from './useMcuDoc';
import DocPanelMcuDevice from './DocPanelMcuDevice';


import { Stack } from '@mui/system';
import DocPanelSearch from './DocPanelSearch';
import DocPanelDownloadDialog from './DocPanelDownloadDialog';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import DocPanelDownload from './DocPanelDownload';

function DocPanel({ offsetWidth = 0 }) {
  const boxRef = useRef(null);
  const sDocFilterDevice = useSelector((state) => state.configurationReducer.sDocFilterDevice);

  const oMcuInfoCache = useSelector((state) => state.configurationReducer.oMcuDataCache);


  let jMcuDevices = [];
  let filteredLines = {};
  if (oMcuInfoCache !== null) {
    if (sDocFilterDevice !== '') {
      const aDevices = Object.keys(oMcuInfoCache.oDevices);
      filteredLines = aDevices.reduce((oReducedLines, sDevice) => {
        if (sDevice.search(sDocFilterDevice.toUpperCase()) !== -1) {
          const aDsGroupDevices = Object.keys(oMcuInfoCache.oDevices[sDevice].sDsGroup)
          if (aDsGroupDevices.length !== 1) {
            console.log('more ds devices in group')
          }
          oReducedLines[aDsGroupDevices[0]] = oMcuInfoCache.oDsGroup[aDsGroupDevices[0]]
          // oReducedLines[oMcuInfoCache.oDsGroup[oMcuInfoCache.oDevices[sDevice].oName]] = true;
        }
        return oReducedLines;
      }, {})
    } else {
      filteredLines = oMcuInfoCache.oDsGroup;
    }
    Object.keys(filteredLines).forEach(sKey => {
      const oLine = oMcuInfoCache.oDsGroup[sKey]
      jMcuDevices.push(<DocPanelMcuDevice key={oLine.sName} oLine={oLine} oMcuDoc={oMcuInfoCache.oMcuDoc} />);
    });
  }

  const appBarSx = { width: `calc(100% - ${offsetWidth}px)`, ml: `${offsetWidth}px` }


  /* dl button */

  const [openDl, setOpenDl] = useState(false);
  const handleDlClick = () => {
    setOpenDl(true)
  }
  const handleDlClose = () => {
    setOpenDl(false)
  }


  return (
    <Box ref={boxRef}>
      {/* // <Box ref={refCallback}> */}
      <AppBar position="fixed" sx={{ ...appBarSx }}>
        <Toolbar>
          <Box display='flex' flexGrow={1}>
            <DocPanelSearch />
          </Box>

          <IconButton onClick={handleDlClick}>
            <DownloadForOfflineIcon />
          </IconButton>
        </Toolbar>

      </AppBar>
      <Box m={1}>
        <Toolbar />
        <DocPanelDownload onClose={handleDlClose} open={openDl} />
        <Grid container justifyContent="center" spacing={2}>
          {jMcuDevices}
        </Grid>
      </Box>
      <DocPanelDownloadDialog />
    </Box>
  )
}

export default DocPanel