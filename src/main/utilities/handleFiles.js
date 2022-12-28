const fs = require('fs');
const path = require('path').win32;

function loadFile(sFilePath) {
  const fs = require('fs');
  try {
    sFilepath.replace('%USERPROFILE%', getUserHome());
    const data = fs.readFileSync(path.resolve(sFilePath), 'utf8');
  } catch (err) {
    console.error(err);
    return null;
  }
  return data;
}

function pathExists(sFilePath) {
  /*solve issue of home dir */
  const sHomePath = getUserHome();
  sFilePath = sFilePath.replace('%USERPROFILE%', sHomePath);
  return fs.existsSync(path.resolve(sFilePath))
}

function getUserHome() {
  // Return the value using process.env
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

const handlefiles = { loadFile, pathExists }
module.exports = handlefiles;