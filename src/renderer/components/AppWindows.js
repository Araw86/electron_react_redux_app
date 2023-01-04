import React, { Component, useEffect, useState } from "react";
import { Box, Button, Grid, Tab, Tabs } from '@mui/material';

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

  useConfig();

  // console.log(oState)
  useMcuDocs();
  useMcuFeatures();

  useDatabasePath();
  useRepoPath();

  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Box sx={{ height: "100vh", display: 'flex' }} >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1, borderColor: 'divider', overflow: "visible", '.MuiTabs-indicator': {
            left: 0
          }
        }}
      >
        <Tab icon={<TextSnippetIcon />} label="Doc" />
        <Tab icon={<SettingsIcon />} label="Settings" />
      </Tabs>
      <Box sx={{ width: '100%' }}>
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