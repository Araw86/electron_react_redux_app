const { app, ipcMain } = require('electron');


function ipc_handlers() {
  ipcMain.handle('app', (event, data) => {
    switch (data.type) {
      case 0:
        return app.getVersion();
      default:
        return null;
    }
  });
};

module.exports = { ipc_handlers };


