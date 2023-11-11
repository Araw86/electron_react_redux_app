import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ipcDocFilesStat, ipcDocFilesMeta } from "./ipcFunctions";

/**
 * hook to check the files on disc
 */
async function checkMcuDocFilesOnDisc(oMcuDocIn, sMxRepPath) {

  // const oMcuDataCache = useSelector((state) => state.configurationReducer.oMcuDataCache)
  // const sMxRepPath = useSelector((state) => state.configurationReducer.sMxRepPath)

  async function checkDocOnDisc() {
    let oMcuDoc = JSON.parse(JSON.stringify(oMcuDocIn)) //deep copy of object
    // let oMcuDoc = oMcuDocIn
    let oMcuDocStat = {}
    //read file stst times
    const aMcuDoc = Object.keys(oMcuDoc);

    // console.log(oMcuDoc)
    for (let i = 0; i < aMcuDoc.length; i++) {
      const sMcuDoc = aMcuDoc[i]
      let oOneMcuDoc = oMcuDoc[sMcuDoc]
      const dFileStatDate = await ipcDocFilesStat(sMxRepPath + sMcuDoc + '.pdf')
      oMcuDocStat[sMcuDoc] = {}
      oMcuDocStat[sMcuDoc].dFileStatNew = dFileStatDate
      // console.log(oOneMcuDoc)
      //doc dont have previous store info, so it was not on disc before
      if (!oOneMcuDoc.hasOwnProperty('dFileStat')) {
        oOneMcuDoc.dFileStat = null //add stat property to object
        oOneMcuDoc.dFileMeta = null ///add property for meta data
      }
      //the doc is on disc
      if (dFileStatDate !== null) {
        //doc was on disc before
        if (oOneMcuDoc.dFileStat !== null) {
          if (oOneMcuDoc.dFileStat !== dFileStatDate) {
            //file is not the one previously marked
            oOneMcuDoc.dFileStat = dFileStatDate // store new time
            //check meta value if possible
          }
        } else {
          //check meta value if possible
          oOneMcuDoc.dFileStat = dFileStatDate // store new time
        }
      } else {
        // else no file present so no stat and meta
        oOneMcuDoc.dFileStat = null //add stat property to object
        oOneMcuDoc.dFileMeta = null ///add property for meta data
      }
      oMcuDoc[sMcuDoc] = oOneMcuDoc
    }
    // console.log(oMcuDocStat)
    // console.log(oMcuDoc)
    //check missing files

    //check file times with cache
    console.log(oMcuDoc)
    return oMcuDoc
  }


  async function checkDocMetaParameters() {
  }
  return await checkDocOnDisc();
}


export default checkMcuDocFilesOnDisc