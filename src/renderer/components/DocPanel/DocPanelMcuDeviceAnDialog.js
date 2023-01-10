import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React, { Fragment, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { yellow } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { ipcExeFile } from '../../utilities/ipcFunctions';

export default function DocPanelMcuDeviceAnDialog({ oLine, oMcuDoc }) {
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }
  // const aDocuments = [];
  const aDocuments = oLine.an.map((sDoc) => {
    return <DocPanelMcuDeviceAnDialogItem key={sDoc} oOneDoc={oMcuDoc[sDoc]} />
  })
  return (
    <Grid item >
      <IconButton aria-label="settings" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open} scroll={'paper'}>
        <DialogTitle>Other Documentation</DialogTitle>
        <DialogContent >

          <List>

            {aDocuments}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

function DocPanelMcuDeviceAnDialogItem({ oOneDoc }) {

  const sMxRepPathValid = useSelector((state) => state.configurationReducer.sMxRepPathValid)
  const sMxRepPathConf = useSelector((state) => state.configurationReducer.configuration.sMxRepPath)
  const handleClick = () => {
    if (sMxRepPathValid) {
      ipcExeFile(sMxRepPathConf + '/' + oOneDoc.displayName + '.pdf');
      console.log('exec ')
    } else {
      console.log('Missing path')
    }
  }
  return (
    <ListItem disableGutters>
      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: yellow[700] }}>
            AN
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={oOneDoc.displayName + ' ver:' + oOneDoc.versionNumber} secondary={oOneDoc.title} />
      </ListItemButton>
    </ListItem>

  );
}