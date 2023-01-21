import { Dialog, DialogTitle, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';

import ArticleIcon from '@mui/icons-material/Article';
import { Box } from '@mui/system';

function DocPanelDownload({ onClose, open }) {
  const aDownloadQueue = useSelector((state) => state.downloadReducer.aDownloadQueue);
  const handleClose = () => {
    onClose()
  };

  const aDlItems = aDownloadQueue.map((sItemName) => {

    return (
      <ListItem key={sItemName}>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary={sItemName} />
      </ListItem>)
  })


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Download</DialogTitle>
      <Box m={2}>

        {aDownloadQueue.length == 0 ?
          (<Typography>List is empty</Typography>) : (
            <List dense={true}>
              {aDlItems}
            </List>
          )}
      </Box>
    </Dialog>
  )
}

export default DocPanelDownload