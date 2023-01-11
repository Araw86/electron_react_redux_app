import { Button } from '@mui/material'
import React, { Fragment } from 'react'

function SettingsPanelTestTab() {

  const handleClick = () => {
    ipc_handlers.ipcToMainTest('https://www.st.com/resource/en/demos_resources/fw_for_an5179_on_stm8l.zip')
  }
  return (
    <Fragment>
      Test Tab
      <Button onClick={handleClick}>
        Test Download
      </Button>

    </Fragment>
  )
}

export default SettingsPanelTestTab