
const PDFParser = require("pdf2json")
const fs = require('fs').promises;

const pdfParser = new PDFParser();

async function checkFileStatDate(sPdfFile) {
  let iStatDate = null

  try {
    const oStats = await fs.stat(sPdfFile)
    iStatDate = oStats.ctime.getTime()
  } catch (err) {
    console.log('file not exists' + sPdfFile)
  }

  return iStatDate;
}

async function checkPdfMetaDate(sPdfFile) {
  let oMetaData = null;
  try {
    const oStats = await fs.stat(sPdfFile)
    iStatDate = oStats.ctime.getTime()
  } catch (err) {
    console.log('file not exists' + sPdfFile)
    return null
  }
  var connected = new Promise(function (resolve) {
    pdfParser.on("readable", meta => {
      resolve(meta)
    });
  })
  pdfParser.loadPDF(sPdfFile)
  oMetaData = await connected
  //slice string D:20170104162814Z
  const sMetaCreatingData = oMetaData.Meta.CreationDate
  const sYear = sMetaCreatingData.slice(2, 6)
  const sMonth = sMetaCreatingData.slice(6, 8)
  const sDay = sMetaCreatingData.slice(8, 10)
  const sHour = sMetaCreatingData.slice(10, 12)
  const sMinute = sMetaCreatingData.slice(12, 14)
  const sSecond = sMetaCreatingData.slice(14, 16)
  const sZone = sMetaCreatingData.slice(16, 17)

  let iMetaDate = new Date(sYear + '-' + sMonth + '-' + sDay + ' ' + sHour + ':' + sMinute + ':' + sSecond + sZone).getTime()
  return iMetaDate
}

const docDetailsCheck = { checkPdfMetaDate, checkFileStatDate }
module.exports = docDetailsCheck;
// export default docDetailsCheck;