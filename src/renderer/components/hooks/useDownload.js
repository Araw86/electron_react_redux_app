import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { itemDownloaded, itemDownloadError, startDownload } from "../../redux/downloadSlice";


export function useDownload() {

  const dispatch = useDispatch()
  const sDownloading = useSelector((state) => state.downloadReducer.sDownloading);
  const sMxRepPathValid = useSelector((state) => state.configurationReducer.sMxRepPathValid);
  const sMxRepPath = useSelector((state) => state.configurationReducer.sMxRepPath);
  const oMcuDoc = useSelector((state) => {
    const oSqlParsedData = state.configurationReducer.oSqlParsedData
    if ((oSqlParsedData === undefined) || (oSqlParsedData === null)) {
      return null;
    }
    return oSqlParsedData.mcuDoc;
  })

  const oDownload = useSelector((state) => state.downloadReducer);
  console.log(oDownload)
  useEffect(() => {
    /*start bnew download on items in queue */
    if ((sMxRepPathValid !== null) && (sDownloading !== null)) {
      dispatch(startDownload());
      console.log('download')
      const sDownloadAddress = oMcuDoc[sDownloading].path;
      ipc_handlers.ipcToMainDownload({ type: 'pdf', name: sDownloading, address: sDownloadAddress, location: sMxRepPath })
    }
  }, [sDownloading, sMxRepPathValid, dispatch])
  useEffect(() => {
    console.log('handler log')

    ipc_handlers.ipcToRendererDownload((event, value) => {
      const { type, error } = value
      switch (type) {
        /*donwload complete*/
        case 0:
          dispatch(itemDownloaded())
          break;
        /*download error, close the file */
        case 1:
          dispatch(itemDownloadError())
          break;
        default:
          console.log('error undefined siwtch')
          alert('error undefined siwtch')
          break;
      }
    })
  }, [])



  return null
}
