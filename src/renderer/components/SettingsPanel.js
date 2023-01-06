import React, { useState } from 'react'

import { Box } from '@mui/system'
import { Tab, Tabs, Typography } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'
import SettingsPanelSettingsTab from './SettingsPanelSettingsTab';

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
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

function SettingsPanel() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Settings" />
          <Tab label="Info" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <SettingsPanelSettingsTab />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        Info
      </TabPanel>
    </Box>
  )
}

export default SettingsPanel