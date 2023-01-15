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
  ipcTwoWay: (data) => {
    return ipcRenderer.invoke('config', data);
  },
  ipcToMain: (text) => ipcRenderer.send('write-message', text),
  // we can also expose variables, not just functions
  ipcToRenderer: (callback) => ipcRenderer.on('receive-msg', callback),

  ipcToMainTest: (url) => ipcRenderer.send('download-button', url),

  ipcToMainDownload: (oInfo) => ipcRenderer.send('download-doc-start', oInfo),
  ipcToRendererDownload: (callback) => {
    /* remove all listeners to be sure only one is active */
    ipcRenderer.removeAllListeners('download-doc-response')
    ipcRenderer.on('download-doc-response', callback)
  }
});