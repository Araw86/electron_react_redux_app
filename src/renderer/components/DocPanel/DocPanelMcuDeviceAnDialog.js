import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { yellow } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { ipcExeFile } from '../../utilities/ipcFunctions';

import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';

export default function DocPanelMcuDeviceAnDialog({ oLine, oMcuDoc }) {
  const [open, setOpen] = useState(false);
  const [sSearchValue, setSearchValue] = useState('')

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleChange = (oEvent) => {
    setSearchValue(oEvent.target.value)
  }
  const handleSearchClear = () => {
    setSearchValue('')
  }
  let aFilteredDoc = []
  if (sSearchValue !== '') {
    aFilteredDoc = oLine.an.reduce((aFilteredDoc, sDoc) => {
      if (sDoc.search(sSearchValue.toUpperCase()) !== -1) {
        aFilteredDoc.push(sDoc)
      }
      return aFilteredDoc;
    }, [])
  } else {
    aFilteredDoc = oLine.an;
  }

  // const aDocuments = [];
  const aDocuments = aFilteredDoc.map((sDoc) => {
    return <DocPanelMcuDeviceAnDialogItem key={sDoc} oOneDoc={oMcuDoc[sDoc]} />
  })
  return (
    <Grid item >
      <IconButton aria-label="settings" onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open} scroll={'paper'}>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between"
            alignItems="center" spacing={1}>

            Other Documentation
            <Stack direction="row" alignItems="center" spacing={1}>
              <SearchIcon />
              <TextField size="small" onChange={handleChange} value={sSearchValue}></TextField>
              <IconButton aria-label="Example" onClick={handleSearchClear}>
                <BackspaceIcon />
              </IconButton>
            </Stack>
          </Stack>
        </DialogTitle>

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
        <ListItemText sx={{ wordWrap: 'break-word', }} primary={oOneDoc.displayName + ' ver:' + oOneDoc.versionNumber} secondary={oOneDoc.title} />
      </ListItemButton>
    </ListItem>

  );
}