import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { dispatchStateProp } from "../../redux/configurationSlice";
import { ipcFileExists, ipcSqlQuery } from "../../utilities/ipcFunctions";


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
    const sDeviceLineQuery = 'SELECT DISTINCT rpn.rpn, rpn.marketingStatus, rpn_has_attribute.strValue FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117'
    const aDeviceLine = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDeviceLineQuery })
    const sDeviceFamilyQuery = 'SELECT DISTINCT rpn.rpn,rpn.marketingStatus, rpn_has_attribute.strValue FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=119'
    const aDeviceFamily = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDeviceFamilyQuery })
    const sDocDsQuery = 'SELECT DISTINCT rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=23)'
    const aDocDs = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocDsQuery })
    const sDocRmQuery = 'SELECT DISTINCT rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=25)'
    const aDocRm = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocRmQuery })
    const sDocEsQuery = 'SELECT DISTINCT rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=22)'
    const aDocEs = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocEsQuery })
    const sDocPmQuery = 'SELECT DISTINCT rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=24)'
    const aDocPm = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocPmQuery })

    const sDocAnQuery = 'SELECT DISTINCT rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=19)'
    const aDocAn = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocAnQuery })

    const sDocAllQuery = 'SELECT DISTINCT rpn.rpn, resource.alternateName, resource.description, resource.version, resource.path FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=19 OR rpn_has_resource.subcategory_id=22 OR rpn_has_resource.subcategory_id=23 OR rpn_has_resource.subcategory_id=24 OR rpn_has_resource.subcategory_id=25)'
    const aDocAll = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocAllQuery });

    const oParsedSqlData = parseSqlFiles(aDeviceLine, aDeviceFamily, aDocDs, aDocRm, aDocEs, aDocPm, aDocAn, aDocAll);
    if (oParsedSqlData !== null) {
      console.log(oParsedSqlData)
      dispatch(dispatchStateProp({ sProp: 'oSqlParsedData', oValue: oParsedSqlData }))
    }
  }

  function parseSqlFiles(aDeviceLine, aDeviceFamily, aDocDs, aDocRm, aDocEs, aDocPm, aDocAn, aDocAll) {
    let oParsedSqlData = { device: {}, line: {}, mcuDoc: {}, }
    /* parse devices and lines*/
    oParsedSqlData = aDeviceLine.reduce((oParsedSqlData, oDeviceLine) => {
      /* removed coming soon device which dont have cdocumentation */
      if (oDeviceLine.marketingStatus !== 'Coming soon') {
        oParsedSqlData.device[oDeviceLine.rpn] = { line: oDeviceLine.strValue };
        oParsedSqlData.line[oDeviceLine.strValue] = { line: oDeviceLine.strValue, ds: [], rm: [], es: [], pm: [], an: [] }
      }
      return oParsedSqlData
    }, oParsedSqlData);
    /*parse documentation */
    oParsedSqlData = aDocAll.reduce((oParsedSqlData, oDoc) => {
      if (!oParsedSqlData.mcuDoc.hasOwnProperty(oDoc.alternateName)) {
        oParsedSqlData.mcuDoc[oDoc.alternateName] = { displayName: oDoc.alternateName, title: oDoc.description, versionNumber: oDoc.version, devices: [oDoc.rpn], path: oDoc.path }
      } else {
        oParsedSqlData.mcuDoc[oDoc.alternateName].devices.push(oDoc.rpn)
      }
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
    oParsedSqlData = aDocAn.reduce((oParsedSqlData, oLineDoc) => {
      oParsedSqlData.line[oLineDoc.strValue].an.push(oLineDoc.alternateName)
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


