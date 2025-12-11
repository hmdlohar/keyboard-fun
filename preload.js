const { contextBridge, ipcRenderer } = require('electron');

// Expose a minimal API to the renderer process
contextBridge.exposeInMainWorld('electron', {
  // Nothing needed for now, but this sets up secure communication
  // if we want to add features later (like save/load files)
});

