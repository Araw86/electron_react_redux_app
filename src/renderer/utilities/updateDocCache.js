
import { useDispatch } from "react-redux";
import { dispatchStateProp } from "../../redux/configurationSlice";
import { ipcSetStore } from "./ipcFunctions";


function updateDocInStore() {
  const dispatch = useDispatch();
  dispatch(dispatchStateProp({ sProp: 'oMcuDataCache', oValue: oParsedSqlData })) // send doc structure to redux
}


async function updateDocOnDisc() {
  /* store the new db cache data */
  await ipcSetStore('finderCacheStore', 'oMcuData', oParsedSqlData)
}



export default updateDocCache = { updateDocInStore, updateDocOnDisc }