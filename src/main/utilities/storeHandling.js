const Store = require('electron-store');
const fs = require('fs');
const path = require('path');
const app = require('electron').app

let oStores = {}

// const sAppPath = path.join(path.dirname(app.getPath('exe')), 'database');
let sAppPath = app.getAppPath()
let last = path.basename(sAppPath)
console.log('last: ' + sAppPath)
if (last.search('.asar') > -1) {
  sAppPath = path.dirname(app.getPath('exe'))
}
sAppPath = path.join(sAppPath, 'database');
console.log('Path to app: ' + sAppPath)
const addStore = (sStore) => {
  try {
    oStores[sStore] = new Store({ name: sStore, cwd: sAppPath })
  } catch (error) {
    console.log(error)
    return -1
  }
  return 0
}

const storeSet = ({ sStore, uProperty, uValue }) => {
  try {
    oStores[sStore].set(uProperty, uValue);
  } catch (error) {
    console.log(error)
    return -1
  }
}

const storeGet = ({ sStore, uProperty }) => {
  try {
    return oStores[sStore].get(uProperty)
  } catch (error) {
    console.log(error)
    return null
  }
}

const eraseStore = (sStore) => {
  try {
    /* delete store object */
    delete oStores[sStore]
    /* delete store file */
    const sFilePath = path.join(sAppPath, sStore + '.json')
    console.log(sFilePath)
    console.log(fs.unlinkSync(sFilePath))
  } catch (error) {
    console.log(error)
    return -1
  }
  return 0
}

// 

const storeHandling = { addStore, storeGet, storeSet, eraseStore }
module.exports = storeHandling;