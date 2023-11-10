import { Avatar, Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import DocPanelMcuDeviceAnDialog from './DocPanelMcuDeviceAnDialog';


import DocPanelMcuDeviceDocAvatar from './DocPanelMcuDeviceDocAvatar';

function DocPanelMcuDevice({ oLine = { line: 'Unknown device', files: [] }, oMcuDoc = [] }) {
  const docTypes = ['ds', 'rm', 'pm', 'es'];
  const jAvatars = docTypes.map((sDocType) => {
    return (
      <DocPanelMcuDeviceDocAvatar key={sDocType} sDocType={sDocType} oLine={oLine} oMcuDoc={oMcuDoc} />
    )
  });
  return (
    <Grid item sx={{ maxWidth: '100%' }}>
      <Card >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {oLine.line}
          </Typography>
          <Grid container spacing={1}>
            {/* <Stack direction="row" spacing={1}> */}
            {jAvatars}
            <DocPanelMcuDeviceAnDialog oLine={oLine} oMcuDoc={oMcuDoc} />
            {/* </Stack> */}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default DocPanelMcuDevice