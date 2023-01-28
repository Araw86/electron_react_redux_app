import { Button, CircularProgress } from '@mui/material'
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemForDownload } from '../redux/downloadSlice';


function SettingsPanelTestTab() {

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addItemForDownload('RM0468'));

  }
  useEffect(() => {
    console.log('handler log')
    async function storeHandle() {
      await ipc_handlers.ipcToStores({ type: 0, data: 'test' })
      await ipc_handlers.ipcToStores({ type: 1, data: { sStore: 'test', uProperty: 'testProperty', uValue: 'vestValue' } })
      console.log(await ipc_handlers.ipcToStores({ type: 2, data: { sStore: 'test', uProperty: 'testProperty' } }))
      await ipc_handlers.ipcToStores({ type: 3, data: 'test' })
    }
    storeHandle()
  }, [])


  return (
    <Fragment>
      Test Tab
      <Button onClick={handleClick}>
        Test Download
        <CircularProgress size={20} />
      </Button>

    </Fragment>
  )
}

export default SettingsPanelTestTab