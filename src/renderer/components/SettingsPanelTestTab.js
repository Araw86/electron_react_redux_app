import { Button, CircularProgress } from '@mui/material'
import { createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemForDownload } from '../redux/downloadSlice';

function SettingsPanelTestTab() {

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addItemForDownload('test1'));

  }
  // useEffect(() => {
  //   console.log('handler log')

  //   ipc_handlers.ipcToRendererDownload((event, value) => {
  //     console.log(value)
  //   })
  // }, [])
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