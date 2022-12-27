// const electronApp = require('electron').app;
// const fs = require('fs');
// const path = require('path');

// const configRootPath = path.join(electronApp.getPath('userData'), 'dbConfig.json');


const Store = require('electron-store');

const store = new Store();

// console.log(configRootPath);
// console.log(dbConfig);

// const configFile = 

function configurationExists() {

}

function loadConfiguration() {
  console.log(store);
  return store.get('configuration');
}

function storeConfiguration(oConfig) {
  store.set('configuration', oConfig);
}

const configurationfile = { loadConfiguration, storeConfiguration }
module.exports = configurationfile;