import React from 'react'
import { Box, Button, Grid } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'
import useMcuDoc from './useMcuDoc';
import DocPanelMcuDevice from './DocPanelMcuDevice';

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
      <Grid container justifyContent="center" spacing={2}>
        {jMcuDevices}
      </Grid>
    </Box>
  )
}

export default DocPanel