import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { dispatchStateProp } from "../../redux/configurationSlice";

import { ipcFileExists } from "../../utilities/ipcFunctions";

export function useFinderPath() {
  const dispatch = useDispatch();

  const sCubemxfinderPath = useSelector((state) => state.configurationReducer.sCubemxfinderPath);
  const sCubemxfinderConfPath = useSelector((state) => {
    const oConf = state.configurationReducer.configuration;
    if (oConf === undefined) {
      return null;
    }
    return oConf.sCubemxfinderpath;

  });

  useEffect(() => {
    if (sCubemxfinderConfPath !== null) {
      const sSqlPath = sCubemxfinderConfPath;
      ipcFileExists(sSqlPath).then((bPathValid) => {
        if (bPathValid) {
          dispatch(dispatchStateProp({ sProp: 'sCubemxfinderPath', oValue: sSqlPath }));
          dispatch(dispatchStateProp({ sProp: 'sCubemxfinderPathValid', oValue: true }));
        } else {
          dispatch(dispatchStateProp({ sProp: 'sCubemxfinderPathValid', oValue: false }));
        }
      })
    }
  }, [dispatch, sCubemxfinderConfPath, sCubemxfinderPath])

  /* validate sql path */
  useEffect(() => {
    if (sCubemxfinderPath !== null) {
      const sSqlPath = sCubemxfinderPath + '/plugins/mcufinder/mcu/cube-finder-db.db';
      ipcFileExists(sSqlPath).then((bPathValid) => {
        if (bPathValid) {
          dispatch(dispatchStateProp({ sProp: 'bLocatedSqlFile', oValue: true }));
        }
      })
    }
  }, [dispatch, sCubemxfinderPath]);


}
