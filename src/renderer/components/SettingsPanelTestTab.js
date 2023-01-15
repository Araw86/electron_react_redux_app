import { Button, CircularProgress } from '@mui/material'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';

function SettingsPanelTestTab() {
  const sMxRepPathValid = useSelector((state) => state.configurationReducer.sMxRepPathValid);
  const sMxRepPath = useSelector((state) => state.configurationReducer.sMxRepPath);


  const handleClick = () => {
    if (sMxRepPathValid !== null) {

      ipc_handlers.ipcToMainDownload({ type: 'pdf', name: 'MB1035-C1', address: 'https://www.st.com/resource/en/schematic_pack/mb1035-f303c-c01_schematic.pdf', location: sMxRepPath })
    }

  }
  return (
    <Fragment>
      Test Tab
      <Button onClick={handleClick}>
        Test Download
        <CircularProgress variant="determinate" value={25} size={20} />
      </Button>

    </Fragment>
  )
}

export default SettingsPanelTestTab