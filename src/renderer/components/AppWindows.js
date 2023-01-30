import React, { Component, useEffect, useRef, useState } from "react";
import { Box, Drawer, Tab, Tabs } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'

import SettingsPanel from "./SettingsPanel";


import { useDatabasePath } from "./hooks/useMcuFiles";
import DocPanel from "./DocPanel/DocPanel";

import SettingsIcon from '@mui/icons-material/Settings';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditIcon from '@mui/icons-material/Edit';

import useConfig from "./hooks/useConfig";
import { useDownload } from "./hooks/useDownload";
import ComposePanel from "./ComposePanel/ComposePanel";
import { useRepoPath } from "./hooks/useRepoPath";
import { useFinderPath } from "./hooks/useFinderPath";
import { useSqlCheckState } from "./hooks/useSqlCheckState";
import { useDbCacheUpdate } from "./hooks/useDbCacheUpdate";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  const tabRef = useRef(null);

  useConfig();

  /* check if database path is valid */
  useDatabasePath();

  /* check if repo path is valid */
  useRepoPath();

  /*check if file path is valid */
  useFinderPath();

  /* check is is needed update cache */
  useSqlCheckState();

  /* start db loading a cache update */
  useDbCacheUpdate();

  /* handkle download state changes */
  useDownload()

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
            <Tab icon={<EditIcon />} label="Compose" />
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
          <TabPanel value={tab} index={2}>
            <ComposePanel />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  )
}

export default AppWindows;