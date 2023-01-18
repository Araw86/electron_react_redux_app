import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Box } from '@mui/system';
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { skipDownload, startDownload } from '../../redux/downloadSlice';

function DocPanelDownloadDialog() {
  const iDownloadState = useSelector((state) => state.downloadReducer.iDownloadState);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()

  // useMemo(() => {
  // })

  useEffect(() => {

    if (iDownloadState == 2) {
      setOpen(true)
    }
  }, [iDownloadState])

  const handleRepeat = () => {
    setOpen(false);
    dispatch(startDownload())
  }
  const handleSkip = () => {
    setOpen(false);
    dispatch(skipDownload())
  }
  return (
    <Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Download error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            File is not possible to download.
            It is still open.
            Or download failed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRepeat} autoFocus>Repeat download</Button>
          <Button onClick={handleSkip} >
            Skip
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DocPanelDownloadDialog