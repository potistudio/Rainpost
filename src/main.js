/* Import the Node Modules */
const path = require ("node:path");

/* Import the External Modules */
const { app, BrowserWindow, ipcMain } = require ("electron");

let mainWindow = null;

// Initialize the Application
function init() {
	createWindow();
}

// Create a Application Window
function createWindow() {
	mainWindow = new BrowserWindow ({
		x: 1510,
		y: 10,
		width: 400,
		height: 1060,
		frame: false,
		transparent: true,
		resizable: false,
		movable: false,
		minimizable: false,
		maximizable: false,
		skipTaskbar: true,
		alwaysOnTop: true,
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	mainWindow.loadFile (path.join(__dirname, "../static", "index.html"));

	mainWindow.once ("ready-to-show", () => mainWindow.show());
}

/* Renderer Event */
ipcMain.on ("close-window", () => mainWindow.close());

/* Application Event */
app.once ("ready", () => init());
app.once ("window-all-closed", () => app.quit());
