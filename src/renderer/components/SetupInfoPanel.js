import React, { useState } from 'react'

import { Box } from '@mui/system'
import { Tab, Tabs, Typography } from '@mui/material'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function SetupInfoPanel() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Box>SetupInfoPanel</Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Info" />
          <Tab label="Settings" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        Info
      </TabPanel>
      <TabPanel value={tab} index={1}>
        Settings
      </TabPanel>
    </Box>
  )
}

export default SetupInfoPanel