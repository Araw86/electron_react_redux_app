import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { itemDownloaded, itemDownloadError, startDownload } from "../../redux/downloadSlice";
import manageDownloadedFile from "../../utilities/manageDownloadedFile";


export function useDownload() {

  const dispatch = useDispatch()
  const sDownloading = useSelector((state) => state.downloadReducer.sDownloading);
  const iDownloadState = useSelector((state) => state.downloadReducer.iDownloadState);
  const sMxRepPathValid = useSelector((state) => state.configurationReducer.sMxRepPathValid);
  const sMxRepPath = useSelector((state) => state.configurationReducer.sMxRepPath);
  const oMcuDoc = useSelector((state) => {
    const oMcuDataCache = state.configurationReducer.oMcuDataCache
    if ((oMcuDataCache === undefined) || (oMcuDataCache === null)) {
      return null;
    }
    return oMcuDataCache.oMcuDoc;
  })

  const oDownload = useSelector((state) => state.downloadReducer);
  useEffect(() => {
    /*start bnew download on items in queue */
    if ((sMxRepPathValid !== null) && (sDownloading !== null) && (iDownloadState != 2) && (iDownloadState != 0)) {
      dispatch(startDownload());
      console.log('download')
      if (oMcuDoc !== null) {

        const sDownloadAddress = oMcuDoc[sDownloading].sPath;
        ipc_handlers.ipcToMainDownload({ type: 'pdf', name: sDownloading, address: sDownloadAddress, location: sMxRepPath })
      }
    }
  }, [sDownloading, sMxRepPathValid, iDownloadState, dispatch])

  /* download callback from main */
  ipc_handlers.ipcToRendererDownload((event, value) => {
    const { type, error } = value
    switch (type) {
      /*donwload complete*/
      case 0:
        console.log('downloaded ' + sDownloading)
        manageDownloadedFile(sMxRepPath, sDownloading)
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


  return null
}
