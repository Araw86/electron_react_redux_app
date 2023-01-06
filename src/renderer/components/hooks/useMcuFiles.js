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

  /* read sql data */
  async function readSqlData(dispatch) {
    const sSqlPath = sCubemxfinderPath + '/plugins/mcufinder/mcu/cube-finder-db.db';
    const sDeviceLineQuery = 'SELECT DISTINCT rpn.rpn, rpn_has_attribute.strValue FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117'
    const aDeviceLine = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDeviceLineQuery })
    const sDeviceFamilyQuery = 'SELECT DISTINCT rpn.rpn, rpn_has_attribute.strValue FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=119'
    const aDeviceFamily = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDeviceFamilyQuery })
    const sDocDsQuery = 'SELECT DISTINCT rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=23)'
    const aDocDs = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocDsQuery })
    const sDocRmQuery = 'SELECT DISTINCT rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=25)'
    const aDocRm = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocRmQuery })
    const sDocEsQuery = 'SELECT DISTINCT rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=22)'
    const aDocEs = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocEsQuery })
    const sDocPmQuery = 'SELECT DISTINCT rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=24)'
    const aDocPm = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocPmQuery })
    const sDocAllQuery = 'SELECT DISTINCT resource.alternateName, resource.description, resource.version FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=22 OR rpn_has_resource.subcategory_id=23 OR rpn_has_resource.subcategory_id=24 OR rpn_has_resource.subcategory_id=25)'
    const aDocAll = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocAllQuery });
    const oParsedSqlData = parseSqlFiles(aDeviceLine, aDeviceFamily, aDocDs, aDocRm, aDocEs, aDocPm, aDocAll);
    if (oParsedSqlData !== null) {
      console.log(oParsedSqlData)
      dispatch(dispatchStateProp({ sProp: 'oSqlParsedData', oValue: oParsedSqlData }))
    }
  }

  function parseSqlFiles(aDeviceLine, aDeviceFamily, aDocDs, aDocRm, aDocEs, aDocPm, aDocAll) {
    let oParsedSqlData = { device: {}, line: {}, mcuDoc: {}, }
    /* parse devices and lines*/
    oParsedSqlData = aDeviceLine.reduce((oParsedSqlData, oDeviceLine) => {
      oParsedSqlData.device[oDeviceLine.rpn] = { line: oDeviceLine.strValue };
      oParsedSqlData.line[oDeviceLine.strValue] = { line: oDeviceLine.strValue, ds: [], rm: [], es: [], pm: [] }
      return oParsedSqlData
    }, oParsedSqlData);
    /*parse documentation */
    oParsedSqlData = aDocAll.reduce((oParsedSqlData, oDoc) => {
      oParsedSqlData.mcuDoc[oDoc.alternateName] = { displayName: oDoc.alternateName, title: oDoc.description, versionNumber: oDoc.version }
      return oParsedSqlData
    }, oParsedSqlData)
    oParsedSqlData = aDocDs.reduce((oParsedSqlData, oLineDoc) => {
      oParsedSqlData.line[oLineDoc.strValue].ds.push(oLineDoc.alternateName)
      return oParsedSqlData
    }, oParsedSqlData)
    oParsedSqlData = aDocRm.reduce((oParsedSqlData, oLineDoc) => {
      oParsedSqlData.line[oLineDoc.strValue].rm.push(oLineDoc.alternateName)
      return oParsedSqlData
    }, oParsedSqlData)
    oParsedSqlData = aDocEs.reduce((oParsedSqlData, oLineDoc) => {
      oParsedSqlData.line[oLineDoc.strValue].es.push(oLineDoc.alternateName)
      return oParsedSqlData
    }, oParsedSqlData)
    oParsedSqlData = aDocPm.reduce((oParsedSqlData, oLineDoc) => {
      oParsedSqlData.line[oLineDoc.strValue].pm.push(oLineDoc.alternateName)
      return oParsedSqlData
    }, oParsedSqlData)
    return oParsedSqlData;
  }

  useEffect(() => {
    if (bLocatedSqlFile === true) {
      readSqlData(dispatch);
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

