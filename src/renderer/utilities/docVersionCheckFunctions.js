
/**
 * function check if we have current version in aDocVersions array if yes we check if the version is valid if not we update it
 * @param {object} oMcuDoc - one mcudoc object for check 
 * @returns 
 */
function oneDocVersionCheck(oMcuDoc) {
  const sDocVersion = oMcuDoc.sVersion
  const nVersionIndex = docVersionIndex(sDocVersion, oMcuDoc)
  /*check if version is found in DB and meta part is not null*/
  if ((nVersionIndex !== undefined) && (oMcuDoc.nFileMeta !== null)) {
    if (oMcuDoc.nFileMeta === oMcuDoc.aDocVersions[nVersionIndex].sDocVersionCreation) {
      return true
    }
  }
  return false
}


/**
 * function goes over aDocVersions property and searched the index of version in funbction attribute
 * @param {string} sDocVersion - version string
 * @param {object} oMcuDoc - mcu doc object
 * @returns retrun index number or null
 */
function docVersionIndex(sDocVersion, oMcuDoc) {
  if (oMcuDoc.hasOwnPropery('aDocVersions')) {
    const nVersionIndex = oMcuDoc.aDocVersions.findIndex((oDocVersion) => {
      return (sDocVersion === oDocVersion.sDocVersion)
    })
    if (nVersionIndex !== undefined) {
      return nVersionIndex
    }
  }

  return null
}

function docVersionCheck(oMcuDocs) {

}



/**
 * Function add new version into aDocVersions. newest revision is from 0
 * @param {object} oMcuDoc - doc object
 * @param {string} sVersion -file version
 * @param {number} nFileMeta - timestamp of file creation 
 * @returns 
 */

function docVersionAdd(oMcuDoc, sVersion, nFileMeta) {
  const oNewDocVersion = { sDocVersion: sVersion, nDocVersionCreation: nFileMeta }
  for (let i; i < oMcuDoc.aDocVersions.lenght; i++) {
    if (oMcuDoc.aDocVersions[i] < nFileMeta) {
      oMcuDoc.aDocVersions.splice(i, 0, oNewDocVersion)
      break;
    }
  }

  return oMcuDoc
}

export default { docVersionAdd, docVersionCheck }