
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { ipcFileExists } from "../../utilities/ipcFunctions";

import { dispatchStateProp } from "../../redux/configurationSlice";

export function useRepoPath() {
  const dispatch = useDispatch();
  const sMxRepPathValid = useSelector((state) => state.configurationReducer.sMxRepPathValid);
  const sMxRepPathConf = useSelector((state) => {
    const oConf = state.configurationReducer.configuration;
    if (oConf === undefined) {
      return null;
    }
    return oConf.sMxRepPath;
  });

  useEffect(() => {
    if (sMxRepPathConf !== null) {
      ipcFileExists(sMxRepPathConf).then((bPathValid) => {
        if (bPathValid) {
          dispatch(dispatchStateProp({ sProp: 'sMxRepPath', oValue: sMxRepPathConf }));
          dispatch(dispatchStateProp({ sProp: 'sMxRepPathValid', oValue: true }));
        } else {
          dispatch(dispatchStateProp({ sProp: 'sMxRepPathValid', oValue: false }));
        }
      })
    }
  }, [dispatch, sMxRepPathConf, sMxRepPathValid])

}
