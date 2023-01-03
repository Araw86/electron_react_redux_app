import React, { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { dispatchConfigurationProp, dispatchStateProp } from "../../redux/configurationSlice";
import { ipcFileExists, ipcFileLoad, ipcSqlQuery } from "../../utilities/ipcFunctions";

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
      const sSqlPath = sCubemxfinderpath + '/plugins/mcufinder/mcu/cube-finder-db.db';
      const sSqlQuery = 'SELECT rpn.rpn, rpn_has_attribute.strValue , resource.alternateName FROM rpn JOIN  rpn_has_attribute ON rpn.id= rpn_has_attribute.rpn_id JOIN rpn_has_resource ON rpn.id = rpn_has_resource.rpn_id JOIN resource ON rpn_has_resource.resource_id = resource.id WHERE rpn.class_id=1734 AND rpn_has_attribute.attribute_id=117 AND rpn_has_resource.subcategory_id=24'
      ipcSqlQuery({ sSqlPath, sSqlQuery }).then((oResult) => {
        console.log(oResult);
      }).catch((e) => console.log('issue'))

    }
  }, [dispatch, bLocatedFileMcuFeatures]);
  return null;
}

