import { useEffect } from "react"
import { useSelector } from "react-redux"


/**
 * hook to check the files on disc
 */
function useCheckMcuDocFilesOnDisc() {
  const oMcuDataCache = useSelector((state) => state.configurationReducer.oMcuDataCache)
  const sMxRepPath = useSelector((state) => state.configurationReducer.sMxRepPath)



  useEffect(() => {
    if (oMcuDataCache != null && sMxRepPath != null) {
      console.log(oMcuDataCache, sMxRepPath)

    }
  }, [oMcuDataCache, sMxRepPath])
}


export default useCheckMcuDocFilesOnDisc