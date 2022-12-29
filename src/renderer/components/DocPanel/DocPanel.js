import React from 'react'
import { Box, Button } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'
import useMcuDoc from './useMcuDoc';

function DocPanel() {

  useMcuDoc();

  return (
    <div>DocPanel</div>
  )
}

export default DocPanel