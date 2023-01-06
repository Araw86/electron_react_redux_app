import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

function useMcuDoc() {
  const [mcuInfo, setMcuInfo] = useState(null);
  const oFileMcuDocs = useSelector((state) => state.configurationReducer.oFileMcuDocs)
  const oFileFileMcuFeatures = useSelector((state) => state.configurationReducer.oFileFileMcuFeatures)
  const dispatch = useDispatch();
  useEffect(() => {
    /*filter all info about mcu */
    if ((oFileMcuDocs !== null) && (oFileFileMcuFeatures !== null)) {
      let oMcuInfo = oFileFileMcuFeatures.MCUs.reduce(reduceFunction, { serie: {}, line: {}, device: {}, mcuDoc: {}, mcuDocType: {} })
      oMcuInfo = oFileMcuDocs.Files.reduce(reduceDoc, oMcuInfo);
      // dispatch()
      setMcuInfo(oMcuInfo);
      console.log(oMcuInfo);
    }
    function reduceFunction(oMcuInfo, oItem) {
      const { serie, line, files, RPN } = oItem;
      if (oMcuInfo.serie.hasOwnProperty(serie) === false) {
        oMcuInfo.serie[serie] = [line];
      }
      if (oMcuInfo.line.hasOwnProperty(line) === false) {
        oMcuInfo.serie[serie].push(line);
        oMcuInfo.line[line] = { line: line, files: files };
      }
      oMcuInfo.device[RPN] = { line: line, serie: serie };
      return oMcuInfo
    }
    function reduceDoc(oMcuInfo, oItem) {
      const { id_file, type } = oItem;
      oMcuInfo.mcuDoc[id_file] = oItem;
      oMcuInfo.mcuDocType[type] = true;
      return oMcuInfo;
    }


  }
    , [oFileMcuDocs, oFileFileMcuFeatures])
  return mcuInfo;
}

export default useMcuDoc