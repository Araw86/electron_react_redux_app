import React, { Component, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Button, Drawer, Grid, Tab, Tabs } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'

import SettingsPanel from "./SettingsPanel";

import { dispatchConfiguration, confResetState } from '../redux/configurationSlice'

import { configurationLoad, configurationSave } from '../utilities/configLoad'

import { useDatabasePath, useMcuDocs, useMcuFeatures, useRepoPath } from "./hooks/useMcuFiles";
import DocPanel from "./DocPanel/DocPanel";

import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import useConfig from "./hooks/useConfig";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  const databaseLoaded = useSelector((state) => state.configurationReducer)
  const dispatch = useDispatch()
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </Box>
  );
}

function AppWindows() {

  const dispatch = useDispatch();
  const [version, setVersion] = useState(null);
  const oState = useSelector((state) => state.configurationReducer)
  const tabRef = useRef(null);

  useConfig();

  // console.log(oState)
  useMcuDocs();
  useMcuFeatures();

  useDatabasePath();
  useRepoPath();
  useEffect(() => {
    async function readVersion() {
      const appVersion = await ipc_handlers.ipcTwoWay({ type: 0 });
      document.title = 'Document Opener ' + appVersion;
    }
    readVersion();
  }, []);
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  // const [tabSx, setSxTab] = useState({});
  // useEffect(() => {
  //   if ((tabRef.current !== null) && (tabRef.current.offsetWidth !== null)) {
  //     console.log(tabRef.current.offsetWidth)
  //     setSxTab({ width: `calc(100% - ${tabRef.current.offsetWidth}px)`, ml: `${tabRef.current.offsetWidth}px` })
  //   } else {
  //     setSxTab({ width: '100%' })
  //   }
  //   console.log(tabRef)

  // }, [tabSx, tabRef])

  // const [tabSx, setSxTab] = useState({});
  // const refCallback = useCallback((nodeValue) => {
  //   console.log(nodeValue)
  //   if ((nodeValue !== null) && (nodeValue.clientWidth !== null)) {
  //     console.log(nodeValue.clientWidth)
  //     setSxTab({ width: `calc(100% - ${nodeValue.clientWidth}px)`, ml: `${nodeValue.clientWidth}px` })
  //   } else {
  //     setSxTab({ width: '100%' })
  //   }

  // }, [])

  const [tabSx, setSxTab] = useState({});
  const [tabWidth, setTabWidth] = useState(0);
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      // setwidth(entries[0].contentRect.width)
      setSxTab({ width: `calc(100% - ${entries[0].contentRect.width}px)`, ml: `${entries[0].contentRect.width}px` })
      setTabWidth(entries[0].contentRect.width)
    })
    observer.observe(tabRef.current)
    return () => tabRef.current && observer.unobserve(tabRef.current)
  }, [])

  // let tabSx = {}
  // if ((tabRef.current !== null) && (tabRef.current.offsetWidth !== null)) {
  //   tabSx = { width: `calc(100% - ${tabRef.current.offsetWidth}px)`, ml: `${tabRef.current.offsetWidth}px` }
  // } else {
  //   tabSx = { width: '100%' }
  // }
  // console.log(tabRef)
  // let tabSx;
  return (
    <Box sx={{ height: "100vh", display: 'flex' }} >
      <Box>
        <Drawer
          variant="permanent"
          anchor="left"
        >

          <Tabs
            ref={tabRef}
            // ref={refCallback}
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              overflow: "visible", '.MuiTabs-indicator': {
                left: 0
              }
            }}
          >
            <Tab icon={<TextSnippetIcon />} label="Doc" />
            <Tab icon={<SettingsIcon />} label="Settings" />
          </Tabs>
        </Drawer>
      </Box>
      <Box sx={{ ...tabSx }}>
        {/* <Box sx={{ width: `calc(100% - ${drawerRef.current.offsetWidth}px)`, ml: `${drawerRef.current.offsetWidth}px` }}> */}
        <Box>
          <TabPanel value={tab} index={0}>
            <DocPanel offsetWidth={tabWidth} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <SettingsPanel />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  )
}

export default AppWindows;