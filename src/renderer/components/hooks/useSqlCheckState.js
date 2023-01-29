import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ipcSqlQuery } from "../../utilities/ipcFunctions";


export function useSqlCheckState() {
  const dispatch = useDispatch();


  const bLocatedSqlFile = useSelector((state) => state.configurationReducer.bLocatedSqlFile)
  const sCubemxfinderPath = useSelector((state) => state.configurationReducer.sCubemxfinderPath);

  const sqlVersionCheck = async () => {
    const sSqlPath = sCubemxfinderPath + '/plugins/mcufinder/mcu/cube-finder-db.db';
    const sDeviceLineQuery = 'SELECT * FROM version'
    const aDeviceLine = await ipcSqlQuery({ sSqlPath, sSqlQuery: sDeviceLineQuery })

    console.log(aDeviceLine)


  }


  useEffect(() => {
    if (bLocatedSqlFile === true) {
      sqlVersionCheck()
    }
  }, [bLocatedSqlFile])

}