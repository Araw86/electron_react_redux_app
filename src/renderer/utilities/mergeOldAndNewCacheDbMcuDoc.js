
/**
 *  function will merge the doc objects mainly the version dates that is possible later check if file is up to date
 * @param {object} oOldCacheMcuDoc - old cache object
 * @param {object} oNewCacheMcuDoc - new cache object
 */
function mergeOldAndNewCacheDbMcuDoc(oOldCacheMcuDoc, oNewCacheMcuDoc) {


  // docVersionMerge()
  if (oOldCacheMcuDoc.hasOwnProperty('aDocVersions')) {
    oNewCacheMcuDoc.aDocVersions = [...oOldCacheMcuDoc.aDocVersions]
  } else {
    oNewCacheMcuDoc.aDocVersions = []
  }
}




export default mergeOldAndNewCacheDbMcuDoc