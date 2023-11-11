import { Alert, Avatar, Chip, CircularProgress, Grid, Paper, Popover, Popper, Snackbar, Typography, Badge, Tooltip } from '@mui/material';
import { deepOrange, indigo, lightBlue, lightGreen, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { Fragment, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemForDownload } from '../../redux/downloadSlice';
import { ipcExeFile } from '../../utilities/ipcFunctions';
import ClearIcon from '@mui/icons-material/Clear';

function DocPanelMcuDeviceDocAvatar({ sDocType, oLine, oMcuDoc }) {
  // const aDoc = oLine.files.filter(filterDocumentation)
  // function filterDocumentation(oOneMcuDoc) {
  //   // console.log(`compare ${oOneMcuDoc.type} and ${sDocType}`);
  //   return (oMcuDoc[oOneMcuDoc.file_id].type === sDocType)
  // }
  let jAvatars = [];
  if (sDocType !== 'oDs') {
    jAvatars = Object.keys(oLine[sDocType]).map((sDoc, iIndex, aDocs) => {
      return (<AvatarForOneDoc key={sDoc} sDocType={sDocType} oLine={oLine} oOneMcuDoc={oMcuDoc[sDoc]} bAssignDevice={aDocs.length > 1 ? true : false} />);
    })
  } else {
    jAvatars.push(<AvatarForOneDoc key={oLine.sName} sDocType={sDocType} oLine={oLine} oOneMcuDoc={oMcuDoc[oLine.sName]} bAssignDevice={true} />)
  }

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

  const handleClick = async () => {
    if (sMxRepPathValid) {
      const nStatus = await ipcExeFile(sMxRepPathConf + '/' + oOneMcuDoc.sName + '.pdf');
      console.log('exec ')
      if (nStatus == -1) {
        dispatch(addItemForDownload(oOneMcuDoc.sName))
      }
    } else {
      console.log('Missing path')
    }
  };

  useMemo(() => {
    const bDisplay = oOneMcuDoc.sDevice.find((sDevice) =>
      (sDevice.search(sDocFilterDevice.toUpperCase()) > -1)
    )
    if (bDisplay !== display) {

      setDisplay(bDisplay)
    }

    const bDownloaded = aDownloadQueue.findIndex((sDoc) =>
      (sDoc === oOneMcuDoc.sName)
    )
    if (bDownloaded > -1) {
      setDownload(true)
    } else {

      if (bDownload) {
        handleClick()
      }
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
    case 'oDs':
      if (oOneMcuDoc.sName.search("DB") < 0) {
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
    case 'oRm':
      sAvatarText = 'RM'
      sAvatarLongText = 'Reference manual'
      color = lightBlue[700];
      hColor = lightBlue[900];
      aChipContent = createChipContent(oOneMcuDoc)
      break;
    case 'oPm':
      sAvatarText = 'PM'
      sAvatarLongText = 'Programming manual'
      color = lightGreen[700];
      hColor = lightGreen[900];
      break;
    case 'oEs':
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
    return oOneMcuDoc.sDevice.map((sDeviceName) =>
      <Chip key={sDeviceName} label={sDeviceName} size="small" />
    )
  }
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleRightClick = () => {

    setSnackbarOpen(true)
    navigator.clipboard.writeText(oOneMcuDoc.sPath);
  }

  const bPresentOnDisc = (oOneMcuDoc.dFileStat !== null)

  const oAvatar = (<Avatar sx={{
    bgcolor: color, ':hover': {
      bgcolor: hColor
    }
  }} onClick={handleClick} onContextMenu={handleRightClick} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
    {bDownload ? <CircularProgress size={20} /> : sAvatarText}
  </Avatar>)

  const oBadgeContent = (
    <Badge color="error" overlap="circular"
      badgeContent={
        <Tooltip title="File not present on disc">
          <Box>
            X
          </Box>
          {/* <ClearIcon fontSize='small' /> */}
        </Tooltip>
      } children={oAvatar} />
  )
  return (
    <Fragment >
      <Grid item>
        {bPresentOnDisc ? oAvatar : oBadgeContent}
        {/* {oAvatar} */}
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

            <Typography >{oOneMcuDoc.sName} - {sAvatarLongText}</Typography>
            <Typography variant="body2" >{oOneMcuDoc.sTitle}</Typography>
            <Typography variant="body2">Rev {oOneMcuDoc.sVersion}</Typography>


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