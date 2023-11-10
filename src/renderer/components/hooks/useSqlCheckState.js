import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchStateProp } from "../../redux/configurationSlice";
import { ipcAddStore, ipcGetStore, ipcSqlQuery } from "../../utilities/ipcFunctions";
import checkMcuDocFilesOnDisc from "../../utilities/checkMcuDocFilesOnDisc";

/**
 * check if we have stored db in cache. If not load the db db file. Or if the db file have newer version it will update the cache
 */
export function useSqlCheckState() {
  const dispatch = useDispatch();

  const bLocatedSqlFile = useSelector((state) => state.configurationReducer.bLocatedSqlFile)
  const sCubemxfinderPath = useSelector((state) => state.configurationReducer.sCubemxfinderPath);
  const sMxRepPath = useSelector((state) => state.configurationReducer.sMxRepPath)
  const sMxRepPathValid = useSelector((state) => state.configurationReducer.sMxRepPathValid)

  const sqlVersionCheck = async () => {
    /* check db state */
    const sSqlPath = sCubemxfinderPath + '/plugins/mcufinder/mcu/cube-finder-db.db';
    const sDbversionQuery = 'SELECT * FROM version'
    const aDbVersion = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDbversionQuery })
    const oDbVersion = aDbVersion[0];

    const nDbLastRefresh = oDbVersion.latest_data_refresh
    console.log(oDbVersion)
    console.log(nDbLastRefresh)
    /* store state */
    await ipcAddStore('finderCacheStore')
    const nUpdateTime = await ipcGetStore('finderCacheStore', 'nUpdateTime')
    console.log(nUpdateTime)
    if (nUpdateTime === undefined) {
      /* create new cache */
      dispatch(dispatchStateProp({ sProp: 'bCacheUpdate', oValue: true }))
    } else if (nUpdateTime < nDbLastRefresh) {
      /* refresh database */
      dispatch(dispatchStateProp({ sProp: 'bCacheUpdate', oValue: true }))
    } else {
      /* load cache */
      console.log('cache load')
      let oMcuDataCache = await ipcGetStore('finderCacheStore', 'oMcuData')
      // let oMcuDataCache = JSON.parse(JSON.stringify(await ipcGetStore('finderCacheStore', 'oMcuData'))) //deep copy of object
      console.log(oMcuDataCache)
      oMcuDataCache.oMcuDoc = await checkMcuDocFilesOnDisc(oMcuDataCache.oMcuDoc, sMxRepPath) // check doc files on disc an thier creation date
      dispatch(dispatchStateProp({ sProp: 'oMcuDataCache', oValue: oMcuDataCache }))

    }

  }

  useEffect(() => {
    if (bLocatedSqlFile === true && sMxRepPathValid === true) {
      sqlVersionCheck()
    }
  }, [bLocatedSqlFile, sMxRepPath])

}