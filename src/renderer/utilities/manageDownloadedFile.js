import { ipcDocFilesMeta, ipcDocFilesStat } from "./ipcFunctions"

async function manageDownloadedFile(sFilePath, sFileName) {
  //check creation date of file and creation date on disk. To be stored.
  const sCompletePath = sFilePath + sFileName + '.pdf'
  const oFileStat = await ipcDocFilesStat(sCompletePath)
  const oFileMeta = await ipcDocFilesMeta(sCompletePath)

}


export default manageDownloadedFile