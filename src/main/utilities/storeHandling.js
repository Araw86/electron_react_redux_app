const Store = require('electron-store');
const fs = require('fs')

let oStores = {}

const addStore = (sStore) => {
  oStores[sStore] = new Store({ name: sStore })
}

const storeSet = (sStore, uProperty, uValue) => {
  oStores[sStore].set(uProperty, uValue);
}

const storeGet = (sStore, uProperty) => {
  return oStores[sStore].get(uProperty)
}

const eraseStore = (sStore) => {
  /* delete store object */
  delete oStores[sStore]
  /* delete store file */
  fs.unlinkSync(sStore + '.json')
}

// 

const storeHandling = { addStore, storeGet, storeSet }
module.exports = storeHandling;