import { IconButton, Stack, TextField } from '@mui/material'
import React, { useRef } from 'react'

import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchStateProp } from '../../redux/configurationSlice';

/**
 * sarch panel sith search box and clear button
 * @returns 
 */
function DocPanelSearch() {
  const sarchRef = useRef();
  const dispatch = useDispatch();
  const sDocFilterDevice = useSelector((state) => state.configurationReducer.sDocFilterDevice);
  function handleChange(oEvent) {
    dispatch(dispatchStateProp({ sProp: 'sDocFilterDevice', oValue: oEvent.target.value }));
  }

  /**
   * handle backspace button click
   */
  function handleClick() {
    sarchRef.current.focus();
    dispatch(dispatchStateProp({ sProp: 'sDocFilterDevice', oValue: '' }));
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <SearchIcon />
      <TextField size="small" onChange={handleChange} value={sDocFilterDevice} inputRef={sarchRef}></TextField>
      <IconButton aria-label="Example" onClick={handleClick}>
        <BackspaceIcon />
      </IconButton>
    </Stack>
  )
}

export default DocPanelSearch