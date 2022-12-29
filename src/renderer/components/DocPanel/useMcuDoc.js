import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

function useMcuDoc() {

  const oFileMcuDocs = useSelector((state) => state.configurationReducer.oFileMcuDocs)
  const oFileFileMcuFeatures = useSelector((state) => state.configurationReducer.oFileFileMcuFeatures)

  useEffect(() => {
    if ((oFileMcuDocs !== null) && (oFileFileMcuFeatures !== null)) {
      console.log(oFileFileMcuFeatures);
      const oMcuInfo = oFileFileMcuFeatures.MCUs.reduce(reduceFunction, { serie: {}, line: {} })
      console.log(oMcuInfo);
    }
    function reduceFunction(oMcuInfo, oItem) {
      const { serie, line, files } = oItem;
      if (oMcuInfo.serie.hasOwnProperty(serie) === false) {
        oMcuInfo.serie[serie] = [line];

      }
      if (oMcuInfo.line.hasOwnProperty(line) === false) {
        oMcuInfo.serie[serie].push(line);
        oMcuInfo.line[line] = { files: files };
      }
      return oMcuInfo
    }

  }
    , [oFileMcuDocs, oFileFileMcuFeatures])

  return null;
}

export default useMcuDoc