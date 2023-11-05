

/**
 * File is handling load and store of app config object onto electron-store
 */

const Store = require('electron-store');
const store = new Store();

function configurationExists() {

}

/**
 * function to load a object store on file to app
 * @returns object with configuration loaded from electron-store
 */
function loadConfiguration() {
  return store.get('configuration');
}

/**
 * function to store app configuration into file
 * @param {object} oConfig - object with app configuration to be store into electron-store 
 */
function storeConfiguration(oConfig) {
  store.set('configuration', oConfig);
}

const configurationfile = { loadConfiguration, storeConfiguration }
module.exports = configurationfile;