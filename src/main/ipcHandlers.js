const { app, ipcMain, dialog } = require('electron');

const configurationfile = require('./utilities/configurationfile');

function ipcHandlers() {
  /*data send from rendered will be returned to main */
  ipcMain.handle('config', (event, data) => {
    switch (data.type) {
      case 0:
        return app.getVersion();
      case 1:
        const oConfiguration = configurationfile.loadConfiguration();
        console.log(oConfiguration);
        return { sStatus: 'ok', oConfiguration: oConfiguration }
      case 2:
        console.log('store');
        configurationfile.storeConfiguration(data.data);
        return { sStatus: 'ok' }
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


