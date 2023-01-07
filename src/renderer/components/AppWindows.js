import React, { Component, useEffect, useRef, useState } from "react";
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
  let tabSx;
  if ((tabRef.current !== null) && (tabRef.current.offsetWidth !== null)) {
    tabSx = { width: `calc(100% - ${tabRef.current.offsetWidth}px)`, ml: `${tabRef.current.offsetWidth}px` }
  } else {
    tabSx = { width: '100%' }
  }

  return (
    <Box sx={{ height: "100vh", display: 'flex' }} >
      <Drawer

        variant="permanent"
        anchor="left"
      >

        <Tabs
          ref={tabRef}
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
      <Box sx={{ ...tabSx }}>
        {/* <Box sx={{ width: `calc(100% - ${drawerRef.current.offsetWidth}px)`, ml: `${drawerRef.current.offsetWidth}px` }}> */}
        <Box>
          <TabPanel value={tab} index={0}>
            <DocPanel />
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