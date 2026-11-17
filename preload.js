const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("panda", {
  chooseModsFolder: () => ipcRenderer.invoke("choose-mods-folder"),
  installGithubMod: (url) => ipcRenderer.invoke("install-github-mod", url),
  openExternal: (url) => ipcRenderer.invoke("open-external", url)
});