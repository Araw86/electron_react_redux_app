import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { confResetState, dispatchConfiguration } from '../../redux/configurationSlice';
import { configurationLoad, configurationSave } from '../../utilities/configLoad';

function useConfigDb() {
  const configLoadStatus = useSelector((state) => state.configurationReducer.configLoadStatus)
  const aDbFiles = useSelector((state) => {

    if ((state.configurationReducer.configuration === undefined)) {
      return undefined;
    }
    return state.configurationReducer.configuration.aDbFiles;
  })

  const dispatch = useDispatch();

  /* handle the configuration change */
  useEffect(() => {
    /*config changes */
    if (configLoadStatus !== 0) {
      console.log(aDbFiles);
      if (aDbFiles === undefined) {
        console.log('aDbFiles udefined');
      }
    }

  }, [dispatch, aDbFiles, configLoadStatus]);
  return null;
}

export default useConfigDb