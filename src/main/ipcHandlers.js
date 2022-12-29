const { app, ipcMain, dialog } = require('electron');

const configurationfile = require('./utilities/configurationfile');
const handlefiles = require('./utilities/handleFiles')

function ipcHandlers() {
  /*data send from rendered will be returned to main */
  ipcMain.handle('config', (event, data) => {
    switch (data.type) {
      /*get version */
      case 0:
        return app.getVersion();
      /*load configuration */
      case 1:
        const oConfiguration = configurationfile.loadConfiguration();
        return { sStatus: 'ok', oConfiguration: oConfiguration }
      // return { sStatus: 'nok' }
      /*store configuration */
      case 2:
        configurationfile.storeConfiguration(data.data);
        return { sStatus: 'ok' }
      /*path exuists */
      case 3:
        return handlefiles.pathExists(data.data)
      /*load file */
      case 4:
        return handlefiles.loadFile(data.data);
      default:
        return null;
    }
  });

  /*data send from rendered to main */
  ipcMain.on('write-message', (event, data) => {
    const webContents = event.sender
    //console.log(event);
    const dialogOpts = {
      type: 'info',
      buttons: ['Ok'],
      title: 'button pressed',
      message: 'button pressed',
      detail: 'button was pressed in rendered message: ' + data
    }
    dialog.showMessageBox(dialogOpts, (response) => {

    });
  });
};

module.exports = { ipcHandlers };


