import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { dispatchStateProp } from "../../redux/configurationSlice";
import { ipcFileExists, ipcSqlQuery } from "../../utilities/ipcFunctions";


export function useDbCacheUpdate() {
  const dispatch = useDispatch();

  const bCacheUpdate = useSelector((state) => state.configurationReducer.bCacheUpdate);
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
      // dispatch(dispatchStateProp({ sProp: 'oSqlParsedData', oValue: oParsedSqlData }))
    }
  }

  function parseSqlFiles(aDeviceLine, aDeviceFamily, aDocDs, aDocRm, aDocEs, aDocPm, aDocAn, aDocAll) {
    let oParsedSqlData = { oDevice: {}, oLine: {}, oMcuDoc: {}, }
    /* parse devices and lines*/
    oParsedSqlData = aDeviceLine.reduce((oParsedSqlData, oDeviceLine) => {
      /* removed coming soon device which dont have cdocumentation */
      if (oDeviceLine.marketingStatus !== 'Coming soon') {
        oParsedSqlData.oDevice[oDeviceLine.rpn] = { sLine: oDeviceLine.strValue };
        oParsedSqlData.oLine[oDeviceLine.strValue] = { sLine: oDeviceLine.strValue, aDs: [], aRm: [], aEs: [], aPm: [], aAn: [] }
      }
      return oParsedSqlData
    }, oParsedSqlData);
    /*parse documentation */
    oParsedSqlData = aDocAll.reduce((oParsedSqlData, oDoc) => {
      if (!oParsedSqlData.oMcuDoc.hasOwnProperty(oDoc.alternateName)) {
        oParsedSqlData.oMcuDoc[oDoc.alternateName] = { sName: oDoc.alternateName, sTitle: oDoc.description, nVersion: oDoc.version, aDevices: [oDoc.rpn], sPath: oDoc.path }
      } else {
        oParsedSqlData.oMcuDoc[oDoc.alternateName].aDevices.push(oDoc.rpn)
      }
      return oParsedSqlData
    }, oParsedSqlData)
    oParsedSqlData = aDocDs.reduce((oParsedSqlData, oLineDoc) => {
      oParsedSqlData.oLine[oLineDoc.strValue].aDs.push(oLineDoc.alternateName)
      return oParsedSqlData
    }, oParsedSqlData)
    oParsedSqlData = aDocRm.reduce((oParsedSqlData, oLineDoc) => {
      oParsedSqlData.oLine[oLineDoc.strValue].aRm.push(oLineDoc.alternateName)
      return oParsedSqlData
    }, oParsedSqlData)
    oParsedSqlData = aDocEs.reduce((oParsedSqlData, oLineDoc) => {
      oParsedSqlData.oLine[oLineDoc.strValue].aEs.push(oLineDoc.alternateName)
      return oParsedSqlData
    }, oParsedSqlData)
    oParsedSqlData = aDocPm.reduce((oParsedSqlData, oLineDoc) => {
      oParsedSqlData.oLine[oLineDoc.strValue].aPm.push(oLineDoc.alternateName)
      return oParsedSqlData
    }, oParsedSqlData)
    oParsedSqlData = aDocAn.reduce((oParsedSqlData, oLineDoc) => {
      oParsedSqlData.oLine[oLineDoc.strValue].aAn.push(oLineDoc.alternateName)
      return oParsedSqlData
    }, oParsedSqlData)
    return oParsedSqlData;
  }

  useEffect(() => {
    if (bCacheUpdate === true) {
      readSqlData(dispatch);
    }
  }, [dispatch, bCacheUpdate]);
}