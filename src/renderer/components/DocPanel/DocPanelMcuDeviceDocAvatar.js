import { Avatar, Chip, Popover, Typography } from '@mui/material';
import { deepOrange, indigo, lightBlue, lightGreen, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux';
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
  const [anchorEl, setAnchorEl] = useState(null);
  let sAvatarText;
  let sAvatarLongText;
  let color = '';
  const open = Boolean(anchorEl);
  let aChipContent = [];
  switch (sDocType) {
    case 'ds':
      if (oOneMcuDoc.displayName.search("DB") < 0) {
        sAvatarText = 'DS'
        sAvatarLongText = 'Datasheet'
        color = deepOrange[700];
      } else {
        sAvatarText = 'DB'
        sAvatarLongText = 'Databreef'
        color = indigo[700];
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
      aChipContent = createChipContent(oOneMcuDoc)
      break;
    case 'pm':
      sAvatarText = 'PM'
      sAvatarLongText = 'Programming manual'
      color = lightGreen[700];
      break;
    case 'es':
      sAvatarText = 'ES'
      sAvatarLongText = 'Errata sheet'
      color = red[700];
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

  const handleClick = () => {
    if (sMxRepPathValid) {
      ipcExeFile(sMxRepPathConf + '/' + oOneMcuDoc.displayName + '.pdf');
      console.log('exec ')
    } else {
      console.log('Missing path')
    }
  };


  return (
    <Fragment >
      <Avatar sx={{ bgcolor: color }} onClick={handleClick} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>{sAvatarText}</Avatar>
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
    </Fragment>
  );
}