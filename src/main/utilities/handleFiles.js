const fs = require('fs');
const path = require('path').win32;
const { shell } = require('electron')

function loadFile(sFilePath) {
  try {
    /*solve issue of home dir */
    const sHomePath = getUserHome();
    sFilePath = sFilePath.replace('%USERPROFILE%', sHomePath);
    const data = fs.readFileSync(path.resolve(sFilePath), 'utf8');
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }

}

function pathExists(sFilePath) {
  try {
    /*solve issue of home dir */
    const sHomePath = getUserHome();
    sFilePath = sFilePath.replace('%USERPROFILE%', sHomePath);
    return fs.existsSync(path.resolve(sFilePath))
  } catch (err) {
    console.error(err);
    return null;
  }
}

function runFile(sFilePath) {
  try {
    shell.openPath(sFilePath)
  } catch (err) {
    console.error(err);
    return null;
  }
}

function getUserHome() {
  // Return the value using process.env
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

const handlefiles = { loadFile, pathExists, runFile }
module.exports = handlefiles;