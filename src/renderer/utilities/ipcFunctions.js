export async function ipcFileExists(sPath) {
  return await ipc_handlers.ipcTwoWay({ type: 3, data: sPath });
}

export async function ipcFileLoad(sPath) {
  return await ipc_handlers.ipcTwoWay({ type: 4, data: sPath });
}

export async function ipcExeFile(sPath) {
  const bPathValid = await ipcFileExists(sPath);
  if (bPathValid) {
    await ipc_handlers.ipcTwoWay({ type: 5, data: sPath });
  } else {
    console.log('Wrong path')
  }
}

export async function ipcSqlQuery(oSqlDetails) {
  return await ipc_handlers.ipcTwoWay({ type: 6, data: oSqlDetails });
}