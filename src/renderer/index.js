/* Import ipcRenderer */
const { ipcRenderer } = require ("electron");

document.getElementById ("windowCloseButton").addEventListener ("click", () => ipcRenderer.send("close-window"));
