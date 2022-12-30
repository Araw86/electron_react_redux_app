import { Avatar } from '@mui/material';
import React, { Fragment } from 'react'

function DocPanelMcuDeviceDocAvatar({ sDocType, oLine, oMcuDoc }) {
  const aDoc = oLine.files.filter(filterDocumentation)

  function filterDocumentation(oOneMcuDoc) {
    // console.log(`compare ${oOneMcuDoc.type} and ${sDocType}`);
    return (oMcuDoc[oOneMcuDoc.file_id].type === sDocType)
  }
  let jAvatars = [];
  let sAvatarText;
  switch (sDocType) {
    case 'Datasheet':
      sAvatarText = 'DS'
      break;
    case 'Data brief':
      sAvatarText = 'DB'
      break;
    case 'Reference manual':
      sAvatarText = 'RM'
      break;
    case 'Programming manual':
      sAvatarText = 'PM'
      break;
    case 'Errata sheet':
      sAvatarText = 'ES'
      break;
    default:
      break;
  }
  jAvatars = aDoc.map(oDoc => {
    return (<Avatar key={oDoc.file_id} >{sAvatarText}</Avatar>);
  })

  return (
    <Fragment>
      {jAvatars}
    </Fragment>
  )
}

export default DocPanelMcuDeviceDocAvatar;