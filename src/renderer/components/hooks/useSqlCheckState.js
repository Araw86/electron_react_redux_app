import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchStateProp } from "../../redux/configurationSlice";
import { ipcAddStore, ipcGetStore, ipcSqlQuery } from "../../utilities/ipcFunctions";


export function useSqlCheckState() {
  const dispatch = useDispatch();

  const bLocatedSqlFile = useSelector((state) => state.configurationReducer.bLocatedSqlFile)
  const sCubemxfinderPath = useSelector((state) => state.configurationReducer.sCubemxfinderPath);

  const sqlVersionCheck = async () => {
    /* check db state */
    const sSqlPath = sCubemxfinderPath + '/plugins/mcufinder/mcu/cube-finder-db.db';
    const sDbversionQuery = 'SELECT * FROM version'
    const aDbVersion = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDbversionQuery })
    const oDbVersion = aDbVersion[0];

    const nDbLastRefresh = oDbVersion.oDbVersion
    console.log(oDbVersion)
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

    }

  }

  useEffect(() => {
    if (bLocatedSqlFile === true) {
      sqlVersionCheck()
    }
  }, [bLocatedSqlFile])

}