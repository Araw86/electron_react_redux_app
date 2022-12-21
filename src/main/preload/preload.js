const { contextBridge, app, ipcRenderer } = require('electron');

console.log('preload run');

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
});

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld('ipc_handlers', {
  ipc_twoWay: async (data) => {
    return await ipcRenderer.invoke('app', data);
  }
  // we can also expose variables, not just functions
});