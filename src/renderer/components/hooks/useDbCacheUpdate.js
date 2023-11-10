import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { dispatchStateProp } from "../../redux/configurationSlice";
import { ipcFileExists, ipcGetStore, ipcSetStore, ipcSqlQuery } from "../../utilities/ipcFunctions";
import checkMcuDocFilesOnDisc from "../../utilities/checkMcuDocFilesOnDisc";
import mergeOldAndNewCaheDB from "../../utilities/mergeOldAndNewCaheDB";

/* the db cache need to be updated or created so we read the db file and update the cache */
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
  const sMxRepPath = useSelector((state) => state.configurationReducer.sMxRepPath)
  const sMxRepPathValid = useSelector((state) => state.configurationReducer.sMxRepPathValid)

  const bLocatedSqlFile = useSelector((state) => state.configurationReducer.bLocatedSqlFile)

  /* read sql data */
  async function readSqlData(dispatch) {
    const sSqlPath = sCubemxfinderPath + '/plugins/mcufinder/mcu/cube-finder-db.db';
    const sDeviceLineQuery = 'SELECT rpn.rpn, rpn.marketingStatus, rpn_has_attribute.strValue FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117'
    const aDeviceLine = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDeviceLineQuery })
    const sDeviceFamilyQuery = 'SELECT rpn.rpn,rpn.marketingStatus, rpn_has_attribute.strValue FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=119'
    const aDeviceFamily = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDeviceFamilyQuery })
    const sDocDsQuery = 'SELECT rpn.rpn, rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=23)'
    const aDocDs = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocDsQuery })
    const sDocRmQuery = 'SELECT rpn.rpn, rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=25)'
    const aDocRm = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocRmQuery })
    const sDocEsQuery = 'SELECT rpn.rpn, rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=22)'
    const aDocEs = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocEsQuery })
    const sDocPmQuery = 'SELECT rpn.rpn, rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=24)'
    const aDocPm = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocPmQuery })

    const sDocAnQuery = 'SELECT rpn.rpn, rpn_has_attribute.strValue ,resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=19)'
    const aDocAn = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocAnQuery })

    const sDocAllQuery = 'SELECT rpn.rpn, resource.alternateName, resource.description, resource.version, resource.path FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE (rpn.class_id=1734 OR rpn.class_id=1738 OR rpn.class_id=2319) AND rpn_has_attribute.attribute_id=117 AND (rpn_has_resource.subcategory_id=19 OR rpn_has_resource.subcategory_id=22 OR rpn_has_resource.subcategory_id=23 OR rpn_has_resource.subcategory_id=24 OR rpn_has_resource.subcategory_id=25)'
    const aDocAll = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDocAllQuery });

    const sDbversionQuery = 'SELECT * FROM version'
    const aDbVersion = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDbversionQuery })
    const nDbLastRefresh = aDbVersion[0].latest_data_refresh;

    let oParsedSqlData = parseSqlFiles(aDeviceLine, aDocDs, aDocRm, aDocEs, aDocPm, aDocAn, aDocAll);
    // let oParsedSqlData = JSON.parse(JSON.stringify(parseSqlFiles(aDeviceLine, aDocDs, aDocRm, aDocEs, aDocPm, aDocAn, aDocAll))) //deep copy of object
    if (oParsedSqlData !== null) {
      console.log(oParsedSqlData)
      /* read last update time */
      const nUpdateTime = await ipcGetStore('finderCacheStore', 'nUpdateTime');
      await ipcSetStore('finderCacheStore', 'oMcuData', oParsedSqlData)

      /* stiore the new db cache time */
      await ipcSetStore('finderCacheStore', 'nUpdateTime', nDbLastRefresh)
      /* store the new db cache data */
      await ipcSetStore('finderCacheStore', 'oMcuData', oParsedSqlData)
      /* send new db cache data to store */
      console.log('new cache created from sql database')
      oParsedSqlData.oMcuDoc = await checkMcuDocFilesOnDisc(oParsedSqlData.oMcuDoc, sMxRepPath) // check doc files on disc an thier creation date
      /* check if this is new db or we can merge with ilder data info */
      if (nUpdateTime !== null) {
        mergeOldAndNewCaheDB()
      }
      dispatch(dispatchStateProp({ sProp: 'oMcuDataCache', oValue: oParsedSqlData })) // send doc structure to redux
    }
  }

  /**
   * function take infromation about documentation and parse it to object
   * @param {array} aDeviceLine 
   * @param {array} aDocDs 
   * @param {array} aDocRm 
   * @param {array} aDocEs 
   * @param {array} aDocPm 
   * @param {array} aDocAn 
   * @param {array} aDocAll 
   * @returns object with parsed documentation data
   */
  function parseSqlFiles(aDeviceLine, aDocDs, aDocRm, aDocEs, aDocPm, aDocAn, aDocAll) {
    let oParsedSqlData = { oDevices: {}, oDsGroup: {}, oGroups: {}, oMcuDoc: {}, }
    /* parse DS group and groups*/
    oParsedSqlData = aDocDs.reduce((oParsedSqlData, oLineDoc) => {
      if (!oParsedSqlData.oDsGroup.hasOwnProperty(oLineDoc.alternateName)) {
        oParsedSqlData.oDsGroup[oLineDoc.alternateName] = { sName: oLineDoc.alternateName, aDevices: [oLineDoc.rpn], sGroup: oLineDoc.strValue, oRm: {}, oEs: {}, oPm: {}, oAn: {} }
      } else {
        oParsedSqlData.oDsGroup[oLineDoc.alternateName].aDevices.push(oLineDoc.rpn)
      }
      oParsedSqlData.oGroups[oLineDoc.strValue] = { sName: oLineDoc.strValue }
      if (!oParsedSqlData.oDevices.hasOwnProperty(oLineDoc.rpn)) {
        oParsedSqlData.oDevices[oLineDoc.rpn] = { sDsGroup: {} }
        oParsedSqlData.oDevices[oLineDoc.rpn].sDsGroup[oLineDoc.alternateName] = { oName: oLineDoc.alternateName }
      } else {
        oParsedSqlData.oDevices[oLineDoc.rpn].sDsGroup[oLineDoc.alternateName] = { oName: oLineDoc.alternateName }
      }
      return oParsedSqlData
    }, oParsedSqlData)

    /*assign RM to DS group*/
    oParsedSqlData = aDocRm.reduce((oParsedSqlData, oLineDoc) => {
      try {
        const dsGroups = oParsedSqlData.oDevices[oLineDoc.rpn].sDsGroup;
        const dsGroupNames = Object.keys(dsGroups)
        dsGroupNames.forEach((dsGroup) => {
          oParsedSqlData.oDsGroup[dsGroup].oRm[oLineDoc.alternateName] = { sName: oLineDoc.alternateName }
        })
      } catch (error) {
        console.log('This rpn: ' + oLineDoc.rpn + ' have no DS defined !!! Report it ')
      }

      return oParsedSqlData
    }, oParsedSqlData)


    oParsedSqlData = aDocEs.reduce((oParsedSqlData, oLineDoc) => {
      try {
        const dsGroups = oParsedSqlData.oDevices[oLineDoc.rpn].sDsGroup;
        const dsGroupNames = Object.keys(dsGroups)
        dsGroupNames.forEach((dsGroup) => {
          oParsedSqlData.oDsGroup[dsGroup].oEs[oLineDoc.alternateName] = { sName: oLineDoc.alternateName }
        })
      } catch (error) {
        console.log('This rpn: ' + oLineDoc.rpn + ' have no DS defined !!! Report it ')
      }

      return oParsedSqlData
    }, oParsedSqlData)

    oParsedSqlData = aDocPm.reduce((oParsedSqlData, oLineDoc) => {
      try {
        const dsGroups = oParsedSqlData.oDevices[oLineDoc.rpn].sDsGroup;
        const dsGroupNames = Object.keys(dsGroups)
        dsGroupNames.forEach((dsGroup) => {
          oParsedSqlData.oDsGroup[dsGroup].oPm[oLineDoc.alternateName] = { sName: oLineDoc.alternateName }
        })
      } catch (error) {
        console.log('This rpn: ' + oLineDoc.rpn + ' have no DS defined !!! Report it ')
      }

      return oParsedSqlData
    }, oParsedSqlData)

    oParsedSqlData = aDocAn.reduce((oParsedSqlData, oLineDoc) => {
      try {
        const dsGroups = oParsedSqlData.oDevices[oLineDoc.rpn].sDsGroup;
        const dsGroupNames = Object.keys(dsGroups)
        dsGroupNames.forEach((dsGroup) => {
          oParsedSqlData.oDsGroup[dsGroup].oAn[oLineDoc.alternateName] = { sName: oLineDoc.alternateName }
        })
      } catch (error) {
        console.log('This rpn: ' + oLineDoc.rpn + ' have no DS defined !!! Report it ')
      }

      return oParsedSqlData
    }, oParsedSqlData)

    // // store also link to device
    // oParsedSqlData = aDocAll.reduce((oParsedSqlData, oDoc) => {
    //   if (!oParsedSqlData.oMcuDoc.hasOwnProperty(oDoc.alternateName)) {
    //     oParsedSqlData.oMcuDoc[oDoc.alternateName] = { sName: oDoc.alternateName, sTitle: oDoc.description, sVersion: oDoc.version, sDevice: [oDoc.rpn], sPath: oDoc.path }
    //   } else {
    //     oParsedSqlData.oMcuDoc[oDoc.alternateName].sDevice.push(oDoc.rpn)
    //   }
    //   return oParsedSqlData
    // }, oParsedSqlData)

    //without device link
    oParsedSqlData = aDocAll.reduce((oParsedSqlData, oDoc) => {
      if (!oParsedSqlData.oMcuDoc.hasOwnProperty(oDoc.alternateName)) {
        oParsedSqlData.oMcuDoc[oDoc.alternateName] = { sName: oDoc.alternateName, sTitle: oDoc.description, sVersion: oDoc.version, sPath: oDoc.path }
      }
      return oParsedSqlData
    }, oParsedSqlData)

    return oParsedSqlData;
  }

  useEffect(() => {
    if (bCacheUpdate === true && sMxRepPathValid === true) {
      readSqlData(dispatch);
    }
  }, [dispatch, bCacheUpdate, sMxRepPathValid]);
}