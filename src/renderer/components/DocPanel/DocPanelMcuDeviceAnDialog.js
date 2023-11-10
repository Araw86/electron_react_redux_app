import { Alert, Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Snackbar, Stack, TextField } from '@mui/material'
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { yellow } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { ipcExeFile } from '../../utilities/ipcFunctions';

import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { addItemForDownload } from '../../redux/downloadSlice';

export default function DocPanelMcuDeviceAnDialog({ oLine, oMcuDoc }) {
  const [open, setOpen] = useState(false);
  const [sSearchValue, setSearchValue] = useState('')

  const sarchAnRef = useRef(null);

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
    sarchAnRef.current.focus();
    setSearchValue('')
  }
  // console.log(oLine);
  // console.log(oMcuDoc)

  const aLineAn = useMemo(() => {
    return oLine.an.map((sAnName) => {
      return oMcuDoc[sAnName]
    })
  }
    , []
  );
  // console.log(aLineAn);
  let aFilteredDoc = []
  if (sSearchValue !== '') {
    /* search over AN names */
    aFilteredDoc = oLine.an.reduce((aFilteredDoc, sDoc) => {
      if (sDoc.search(sSearchValue.toUpperCase()) !== -1) {
        aFilteredDoc.push(sDoc)
      }
      return aFilteredDoc;
    }, [])
    /*search over AN titles */
    aFilteredDoc = aLineAn.reduce((aFilteredDoc, oLineAn) => {
      if ((oLineAn.sTitle.toUpperCase()).search(sSearchValue.toUpperCase()) !== -1) {
        if ((aFilteredDoc.length == 0) || !aFilteredDoc.includes(oLineAn.sName)) {
          aFilteredDoc.push(oLineAn.sName)
        }
      }
      return aFilteredDoc;
    }, aFilteredDoc)
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
      <Dialog onClose={handleClose} open={open} scroll={'paper'} disableRestoreFocus>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between"
            alignItems="center" spacing={1}>

            Other Documentation
            <Stack direction="row" alignItems="center" spacing={1}>
              <SearchIcon />
              <TextField size="small" onChange={handleChange} value={sSearchValue} inputRef={sarchAnRef} autoFocus={true}></TextField>
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
  const aDownloadQueue = useSelector((state) => state.downloadReducer.aDownloadQueue)

  const [bDownload, setDownload] = useState(false)

  const dispatch = useDispatch()
  const handleClick = async () => {
    if (sMxRepPathValid) {
      const nStatus = await ipcExeFile(sMxRepPathConf + '/' + oOneDoc.sName + '.pdf');
      console.log('exec ')
      if (nStatus == -1) {
        dispatch(addItemForDownload(oOneDoc.sName))
      }
    } else {
      console.log('Missing path')
    }
  }

  useMemo(() => {
    const bDownloaded = aDownloadQueue.findIndex((sDoc) =>
      (sDoc === oOneDoc.sName)
    )
    if (bDownloaded > -1) {
      setDownload(true)
    } else {

      if (bDownload) {
        handleClick()
      }
      setDownload(false)
    }

  }, [aDownloadQueue])

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleRightClick = () => {

    setSnackbarOpen(true)
    navigator.clipboard.writeText(oOneDoc.sPath);
  }

  return (
    <ListItem disableGutters>
      <ListItemButton onClick={handleClick} onContextMenu={handleRightClick}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: yellow[700] }}>
            {bDownload ? <CircularProgress size={20} /> : 'AN'}
          </Avatar>
        </ListItemAvatar>
        <ListItemText sx={{ wordWrap: 'break-word', }} primary={oOneDoc.sName + ' ver:' + oOneDoc.sVersion} secondary={oOneDoc.sTitle} />
      </ListItemButton>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={2000}
      >
        <Alert variant="filled" severity="info">Link stored to clipboard</Alert>
      </Snackbar>
    </ListItem>

  );
}