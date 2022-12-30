export async function ipcFileExists(sPath) {
  return await ipc_handlers.ipcTwoWay({ type: 3, data: sPath });
}

export async function ipcFileLoad(sPath) {
  return await ipc_handlers.ipcTwoWay({ type: 4, data: sPath });
}

export async function ipcExeFile(sPath) {
  return await ipc_handlers.ipcTwoWay({ type: 5, data: sPath });
}