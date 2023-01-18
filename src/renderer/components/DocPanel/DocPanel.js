import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AppBar, Box, Button, Grid, Tab, Tabs, TextField, Toolbar } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'
import useMcuDoc from './useMcuDoc';
import DocPanelMcuDevice from './DocPanelMcuDevice';


import { Stack } from '@mui/system';
import DocPanelSearch from './DocPanelSearch';
import DocPanelDownloadDialog from './DocPanelDownloadDialog';

function DocPanel({ offsetWidth = 0 }) {
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

  // const [appBarSx, setAppBarSx] = useState({})
  // useEffect(() => {
  //   if ((boxRef.current !== null) && (boxRef.current.offsetLeft !== null)) {
  //     // console.log(boxRef.current.offsetLeft)
  //     setAppBarSx({ width: `calc(100% - ${boxRef.current.offsetLeft}px)`, ml: `${boxRef.current.offsetLeft}px` })
  //   } else {
  //     setAppBarSx({ width: '100%' })
  //   }
  // }, [boxRef.current])

  // const [appBarSx, setAppBarSx] = useState({})
  // const refCallback = useCallback((nodeValue) => {
  //   if ((nodeValue !== null) && (nodeValue.offsetLeft !== null)) {
  //     // console.log(boxRef.current.offsetLeft)
  //     setAppBarSx({ width: `calc(100% - ${nodeValue.offsetLeft}px)`, ml: `${nodeValue.offsetLeft}px` })
  //   } else {
  //     setAppBarSx({ width: '100%' })
  //   }
  //   console.log('run callback')
  // }, [boxRef])

  // let appBarSx = {}
  // if ((boxRef.current !== null) && (boxRef.current.offsetLeft !== null)) {
  //   appBarSx = { width: `calc(100% - ${boxRef.current.offsetLeft}px)`, ml: `${boxRef.current.offsetLeft}px` }
  // } else {
  //   appBarSx = { width: '100%' }
  // }
  // console.log(boxRef)

  // const [appBarSx, setAppBarSx] = useState({})
  // useEffect(() => {
  //   const observer = new ResizeObserver(entries => {
  //     console.log(entries[0])
  //     // setwidth(entries[0].contentRect.width)
  //     // entries[0].target.offsetLeft
  //     setAppBarSx({ width: `calc(100% - ${entries[0].target.offsetLeft}px)`, ml: `${entries[0].target.offsetLeft}px` })
  //   })
  //   observer.observe(boxRef.current)
  //   return () => boxRef.current && observer.unobserve(boxRef.current)
  // }, [])

  const appBarSx = { width: `calc(100% - ${offsetWidth}px)`, ml: `${offsetWidth}px` }

  return (
    <Box ref={boxRef}>
      {/* // <Box ref={refCallback}> */}
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
      <DocPanelDownloadDialog />
    </Box>
  )
}

export default DocPanel