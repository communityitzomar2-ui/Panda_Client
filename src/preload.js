const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('panda', {
  chooseFolder: () => ipcRenderer.invoke('choose-folder'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url)
});
