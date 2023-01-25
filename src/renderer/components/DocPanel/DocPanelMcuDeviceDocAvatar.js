import { Alert, Avatar, Chip, CircularProgress, Grid, Paper, Popover, Popper, Snackbar, Typography } from '@mui/material';
import { deepOrange, indigo, lightBlue, lightGreen, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { Fragment, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemForDownload } from '../../redux/downloadSlice';
import { ipcExeFile } from '../../utilities/ipcFunctions';

function DocPanelMcuDeviceDocAvatar({ sDocType, oLine, oMcuDoc }) {
  // const aDoc = oLine.files.filter(filterDocumentation)
  // function filterDocumentation(oOneMcuDoc) {
  //   // console.log(`compare ${oOneMcuDoc.type} and ${sDocType}`);
  //   return (oMcuDoc[oOneMcuDoc.file_id].type === sDocType)
  // }
  let jAvatars = [];

  jAvatars = oLine[sDocType].map((sDoc, iIndex, aDocs) => {

    return (<AvatarForOneDoc key={sDoc} sDocType={sDocType} oLine={oLine} oOneMcuDoc={oMcuDoc[sDoc]} bAssignDevice={aDocs.length > 1 ? true : false} />);
  })

  return (
    <Fragment>
      {jAvatars}
    </Fragment>
  )
}

export default DocPanelMcuDeviceDocAvatar;


function AvatarForOneDoc({ sDocType, oLine, oOneMcuDoc, bAssignDevice }) {
  const sMxRepPathConf = useSelector((state) => state.configurationReducer.configuration.sMxRepPath)
  const sMxRepPathValid = useSelector((state) => state.configurationReducer.sMxRepPathValid)

  const sDocFilterDevice = useSelector((state) => state.configurationReducer.sDocFilterDevice)

  const aDownloadQueue = useSelector((state) => state.downloadReducer.aDownloadQueue)

  const [anchorEl, setAnchorEl] = useState(null);
  const [display, setDisplay] = useState(null)
  const [bDownload, setDownload] = useState(false)

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const dispatch = useDispatch();

  useMemo(() => {
    const bDisplay = oOneMcuDoc.devices.find((sDevice) =>
      (sDevice.search(sDocFilterDevice.toUpperCase()) > -1)
    )
    if (bDisplay !== display) {

      setDisplay(bDisplay)
    }

    const bDownloaded = aDownloadQueue.findIndex((sDoc) =>
      (sDoc === oOneMcuDoc.displayName)
    )
    if (bDownloaded > -1) {
      setDownload(true)
    } else {
      setDownload(false)
    }

  }, [sDocFilterDevice, aDownloadQueue])
  if (display === undefined) {
    return (<Fragment></Fragment>)
  }
  let sAvatarText;
  let sAvatarLongText;
  let color = '';
  let hColor = '';
  const open = Boolean(anchorEl);
  let aChipContent = [];
  switch (sDocType) {
    case 'ds':
      if (oOneMcuDoc.displayName.search("DB") < 0) {
        sAvatarText = 'DS'
        sAvatarLongText = 'Datasheet'
        color = deepOrange[700];
        hColor = deepOrange[900];
      } else {
        sAvatarText = 'DB'
        sAvatarLongText = 'Databreef'
        color = indigo[700];
        hColor = indigo[900];
      }
      aChipContent = createChipContent(oOneMcuDoc)
      break;
    // case 'Data brief':
    //   sAvatarText = 'DB'
    //   color = indigo[700];
    //   break;
    case 'rm':
      sAvatarText = 'RM'
      sAvatarLongText = 'Reference manual'
      color = lightBlue[700];
      hColor = lightBlue[900];
      aChipContent = createChipContent(oOneMcuDoc)
      break;
    case 'pm':
      sAvatarText = 'PM'
      sAvatarLongText = 'Programming manual'
      color = lightGreen[700];
      hColor = lightGreen[900];
      break;
    case 'es':
      sAvatarText = 'ES'
      sAvatarLongText = 'Errata sheet'
      color = red[700];
      hColor = red[900];
      aChipContent = createChipContent(oOneMcuDoc)
      break;
    default:
      break;
  }

  function createChipContent(oOneMcuDoc) {
    return oOneMcuDoc.devices.map((sDeviceName) =>
      <Chip key={sDeviceName} label={sDeviceName} size="small" />
    )
  }
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClick = async () => {
    if (sMxRepPathValid) {
      const nStatus = await ipcExeFile(sMxRepPathConf + '/' + oOneMcuDoc.displayName + '.pdf');
      console.log('exec ')
      if (nStatus == -1) {
        dispatch(addItemForDownload(oOneMcuDoc.displayName))
      }
    } else {
      console.log('Missing path')
    }
  };


  const handleRightClick = () => {

    setSnackbarOpen(true)
    navigator.clipboard.writeText(oOneMcuDoc.path);
  }

  return (
    <Fragment >
      <Grid item>

        <Avatar sx={{
          bgcolor: color, ':hover': {
            bgcolor: hColor
          }
        }} onClick={handleClick} onContextMenu={handleRightClick} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>{bDownload ? <CircularProgress size={20} /> : sAvatarText}</Avatar>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Box sx={{ p: 2, border: '3px dashed', borderColor: color }}>

            <Typography >{oOneMcuDoc.displayName} - {sAvatarLongText}</Typography>
            <Typography variant="body2" >{oOneMcuDoc.title}</Typography>
            <Typography variant="body2">Rev {oOneMcuDoc.versionNumber}</Typography>


            {bAssignDevice ? aChipContent : <Fragment></Fragment>}
          </Box>
        </Popover>
        <Snackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          autoHideDuration={2000}
        >
          <Alert variant="filled" severity="info">Link stored to clipboard</Alert>
        </Snackbar>
      </Grid>
    </Fragment>
  );
}