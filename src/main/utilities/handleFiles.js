const fs = require('fs');
const path = require('path').win32;
const { shell } = require('electron')

/**
 * open file on path and read its content
 * @param {string} sFilePath - path to file 
 * @returns null|string null if errro, if success return read data
 */
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

/**
 * check if the file in path exists
 * @param {string} sFilePath -path to file 
 * @returns null|boolean value if path exists
 */
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

/**
 * execute the file on specified path. it will open the pdf if targeted
 * @param {string} sFilePath - path to file 
 * @returns 
 */
function runFile(sFilePath) {
  try {
    shell.openPath(path.resolve(sFilePath))
  } catch (err) {
    console.error(err);
    return null;
  }
}

function getUserHome() {
  // Return the value using process.env
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

const handlefiles = { loadFile, pathExists, runFile, getUserHome }
module.exports = handlefiles;