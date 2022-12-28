import React, { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ipcFileExists } from "../../utilities/ipcFunctions";

export function useMcuDocs() {
  const bLocatedFileMcuDocs = useSelector((state) => state.configurationReducer.bLocatedFileMcuDocs);
  const sCubemxfinderpath = useSelector((state) => {
    const oConf = state.configurationReducer.configuration;
    if (oConf === undefined) {
      return null;
    }
    return oConf.sCubemxfinderpath;

  });
  const dispatch = useDispatch;
  useEffect(() => {
    console.log('use effect');
    if (sCubemxfinderpath !== null) {
      const sDocPath = sCubemxfinderpath + '/plugins/mcufinder/mcu/mcusDocs.json';
      ipcFileExists(sDocPath).then((bPathValid) => {
        console.log(bPathValid);
      })
    }
  }, [bLocatedFileMcuDocs]);
  return null;
}



export function useMcuFeatures() {
  const bLocatedFileMcuDocs = useSelector((state) => state.configurationReducer.bLocatedFileMcuFeatures);
  return null;
}

