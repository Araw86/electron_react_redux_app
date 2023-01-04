import React, { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { dispatchConfigurationProp, dispatchStateProp } from "../../redux/configurationSlice";
import { ipcFileExists, ipcFileLoad, ipcSqlQuery } from "../../utilities/ipcFunctions";


/*check if files in path exists */

/* handle the qsl db path validation */
export function useDatabasePath() {
  const dispatch = useDispatch();
  const sCubemxfinderPath = useSelector((state) => state.configurationReducer.sCubemxfinderPath);
  const sCubemxfinderPathValid = useSelector((state) => state.configurationReducer.sCubemxfinderPathValid);
  const sCubemxfinderConfPath = useSelector((state) => {
    const oConf = state.configurationReducer.configuration;
    if (oConf === undefined) {
      return null;
    }
    return oConf.sCubemxfinderpath;

  });

  const bLocatedSqlFile = useSelector((state) => state.configurationReducer.bLocatedSqlFile)
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


  async function readSqlData() {
    const sSqlPath = sCubemxfinderPath + '/plugins/mcufinder/mcu/cube-finder-db.db';
    const sSqlQuery = 'SELECT DISTINCT rpn.rpn, rpn_has_attribute.strValue FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117'
    const sqlData = await ipcSqlQuery({ sSqlPath, sSqlQuery })
    console.log(sqlData);
  }

  useEffect(() => {
    if (bLocatedSqlFile === true) {
      const sSqlPath = sCubemxfinderPath + '/plugins/mcufinder/mcu/cube-finder-db.db';
      const sSqlQuery = 'SELECT DISTINCT rpn.rpn, rpn_has_attribute.strValue FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117'
      const sqlData = ipcSqlQuery({ sSqlPath, sSqlQuery })
      readSqlData();
      console.log('after readSqlData')
      // ipcSqlQuery({ sSqlPath, sSqlQuery }).then((oResult) => {
      //   console.log(sqlData);
      // }).catch((e) => console.log('issue'))
    }
  }, [dispatch, bLocatedSqlFile]);


}



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

export function useMcuDocs() {
  const bLocatedFileMcuDocs = useSelector((state) => state.configurationReducer.bLocatedFileMcuDocs);
  const dispatch = useDispatch();
  const sCubemxfinderpath = useSelector((state) => {
    const oConf = state.configurationReducer.configuration;
    if (oConf === undefined) {
      return null;
    }
    return oConf.sCubemxfinderpath;

  });
  useEffect(() => {
    if (sCubemxfinderpath !== null) {
      const sDocPath = sCubemxfinderpath + '/plugins/mcufinder/mcu/mcusDocs.json';
      ipcFileExists(sDocPath).then((bPathValid) => {
        if (bPathValid) {
          dispatch(dispatchStateProp({ sProp: 'bLocatedFileMcuDocs', oValue: true }));
        }
      })
    }
  }, [dispatch, sCubemxfinderpath, bLocatedFileMcuDocs]);

  /* load file */
  useEffect(() => {
    if (bLocatedFileMcuDocs === true) {
      const sDocPath = sCubemxfinderpath + '/plugins/mcufinder/mcu/mcusDocs.json';
      ipcFileLoad(sDocPath).then((ofile) => {
        dispatch(dispatchStateProp({ sProp: 'oFileMcuDocs', oValue: JSON.parse(ofile) }));
      }).catch((e) => console.log('issue'))
    }
  }, [dispatch, bLocatedFileMcuDocs]);
  return null;
}



export function useMcuFeatures() {
  const bLocatedFileMcuFeatures = useSelector((state) => state.configurationReducer.bLocatedFileMcuFeatures);
  const bLocatedFileMcuDocs = useSelector((state) => state.configurationReducer.bLocatedFileMcuDocs);
  const dispatch = useDispatch();
  const sCubemxfinderpath = useSelector((state) => {
    const oConf = state.configurationReducer.configuration;
    if (oConf === undefined) {
      return null;
    }
    return oConf.sCubemxfinderpath;

  });
  useEffect(() => {
    // if (sCubemxfinderpath !== null) {
    const sPath = sCubemxfinderpath + '/plugins/mcufinder/mcu/mcusFeaturesAndDescription.json';
    ipcFileExists(sPath).then((bPathValid) => {
      if (bPathValid) {
        dispatch(dispatchStateProp({ sProp: 'bLocatedFileMcuFeatures', oValue: true }))
      }
    })
    // }
  }, [dispatch, bLocatedFileMcuDocs, bLocatedFileMcuFeatures]);
  /* load file */
  useEffect(() => {
    if (bLocatedFileMcuFeatures === true) {
      const sDocPath = sCubemxfinderpath + '/plugins/mcufinder/mcu/mcusFeaturesAndDescription.json';
      ipcFileLoad(sDocPath).then((ofile) => {
        dispatch(dispatchStateProp({ sProp: 'oFileFileMcuFeatures', oValue: JSON.parse(ofile) }));
      }).catch((e) => console.log('issue'))
    }
  }, [dispatch, bLocatedFileMcuFeatures]);
  return null;
}

