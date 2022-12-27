

let configurationOperation = 0;

const confTemplate = {
  sCubemxfinderpath: '%USERPROFILE%/.stmcufinder/plugins/mcufinder/mcu'
}


async function configurationLoad(callback) {
  if (configurationOperation === 0) {
    configurationOperation = 1;
    const oConfigStatus = await ipc_handlers.ipcTwoWay({ type: 1 });
    if ((oConfigStatus.sStatus === 'ok') && (oConfigStatus.oConfiguration !== undefined)) {
      callback(oConfigStatus.oConfiguration);
    }
    configurationOperation = 0;
    if (oConfigStatus.oConfiguration === undefined) {
      /*store template configuration */
      console.log('load template');
      configurationSave(confTemplate);
      callback(confTemplate);
    }
  } else {
    return -1;
  }
  return 0;
}


async function configurationSave(oConfiguration) {
  if (configurationOperation === 0) {
    configurationOperation = 1;
    await ipc_handlers.ipcTwoWay({ type: 2, data: oConfiguration });
    configurationOperation = 0;
  } else {
    return -1;
  }
  return 0;
}


export { configurationLoad, configurationSave };