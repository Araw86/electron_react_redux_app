
const { TurnedIn } = require('@mui/icons-material');
const { BrowserWindow } = require('electron');
const { download } = require('electron-dl');

const fs = require('fs').promises
const path = require('path')

async function manageDownload(type, name, address, location) {
  const tempFileName = 'temp.' + type

  await donwloadFile(address, path.normalize(location), tempFileName)
  console.log('download done')
  const sSrcPath = path.join(location, 'temp' + '.' + type)
  const sDestPath = path.join(location, name + '.' + type)

  try {
    await fs.rename(sSrcPath, sDestPath)

    console.log('rename ok')
  } catch (error) {
    console.log('rename error')

  }
}

async function possibleToWriteFile(sFilePath) {
  try {
    const fileHandle = await fs.open(sFilePath, fs.constants.O_RDONLY | 0x10000000);
    fileHandle.close();
  } catch (error) {
    if (error.code === 'EBUSY') {
      console.log('file is busy');
      return false
    } else {
      throw error;
    }
  }
  return true;
}

async function donwloadFile(address, location, tempFileName) {
  const win = BrowserWindow.getFocusedWindow();
  await download(win, address, { directory: location, overwrite: true, filename: tempFileName });
}


function sendInfoBack() {
  const win = BrowserWindow.getFocusedWindow();
  win.webContents.send('download-doc-response', 'Msg A')

}





const filedownload = { manageDownload }
module.exports = filedownload;

