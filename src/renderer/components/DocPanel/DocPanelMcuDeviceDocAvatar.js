import { Avatar, Popover, Typography } from '@mui/material';
import { deepOrange, indigo, lightBlue, lightGreen, red } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { Fragment, useState } from 'react'

function DocPanelMcuDeviceDocAvatar({ sDocType, oLine, oMcuDoc }) {
  const aDoc = oLine.files.filter(filterDocumentation)

  function filterDocumentation(oOneMcuDoc) {
    // console.log(`compare ${oOneMcuDoc.type} and ${sDocType}`);
    return (oMcuDoc[oOneMcuDoc.file_id].type === sDocType)
  }
  let jAvatars = [];

  jAvatars = aDoc.map(oDoc => {
    return (<AvatarForOneDoc key={oDoc.file_id} sDocType={sDocType} oLine={oLine} oOneMcuDoc={oMcuDoc[oDoc.file_id]} />);
  })

  return (
    <Fragment>
      {jAvatars}
    </Fragment>
  )
}

export default DocPanelMcuDeviceDocAvatar;


function AvatarForOneDoc({ sDocType, oLine, oOneMcuDoc }) {
  const [anchorEl, setAnchorEl] = useState(null);
  let sAvatarText;
  let color = '';
  const open = Boolean(anchorEl);
  switch (sDocType) {
    case 'Datasheet':
      sAvatarText = 'DS'
      color = deepOrange[700];
      break;
    case 'Data brief':
      sAvatarText = 'DB'
      color = indigo[700];
      break;
    case 'Reference manual':
      sAvatarText = 'RM'
      color = lightBlue[700];
      break;
    case 'Programming manual':
      sAvatarText = 'PM'
      color = lightGreen[700];
      break;
    case 'Errata sheet':
      sAvatarText = 'ES'
      color = red[700];
      break;
    default:
      break;
  }
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment >
      <Avatar sx={{ bgcolor: color }} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>{sAvatarText}</Avatar>
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
          <Typography >{oOneMcuDoc.displayName} - {oOneMcuDoc.type}</Typography>
          <Typography variant="body2" >{oOneMcuDoc.title}</Typography>
          <Typography variant="body2">Rev {oOneMcuDoc.versionNumber}</Typography>
        </Box>
      </Popover>
    </Fragment>
  );
}