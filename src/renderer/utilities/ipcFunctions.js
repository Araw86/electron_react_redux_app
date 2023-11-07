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
    return 0;
  } else {
    return -1;
    console.log('Wrong path')
  }
}

export async function ipcSqlQuery(oSqlDetails) {
  return await ipc_handlers.ipcTwoWay({ type: 6, data: oSqlDetails });
}


/* store functions */

export async function ipcAddStore(sStoreName) {
  return await ipc_handlers.ipcToStores({ type: 0, data: sStoreName })
}

export async function ipcSetStore(sStoreName, uStoreProperty, uStoreValue) {
  return await ipc_handlers.ipcToStores({ type: 1, data: { sStore: sStoreName, uProperty: uStoreProperty, uValue: uStoreValue } })
}

export async function ipcGetStore(sStoreName, uStoreProperty) {
  return await ipc_handlers.ipcToStores({ type: 2, data: { sStore: sStoreName, uProperty: uStoreProperty } })
}

export async function ipcRemoveStore(sStoreName) {
  return await ipc_handlers.ipcToStores({ type: 3, data: sStoreName })
}

export async function ipcDocFilesStat(sFilePath) {
  return await ipc_handlers.ipcToDocFiles({ type: 0, data: sFilePath })
}

export async function ipcDocFilesMeta(sFilePath) {
  return await ipc_handlers.ipcToDocFiles({ type: 1, data: sFilePath })
}


