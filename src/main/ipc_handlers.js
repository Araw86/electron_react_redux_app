const { app, ipcMain, dialog } = require('electron');


function ipc_handlers() {
  /*data send from rendered will be returned to main */
  ipcMain.handle('app', (event, data) => {
    switch (data.type) {
      case 0:
        return app.getVersion();
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

module.exports = { ipc_handlers };


