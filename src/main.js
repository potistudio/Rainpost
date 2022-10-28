/* Import the Node Modules */
const path = require ("node:path");

/* Import the External Modules */
const { app, BrowserWindow, Menu, Tray, ipcMain } = require ("electron");

let mainWindow = null;
let mainTray = null;


// Initialize the Application
function init() {
	createTray();
	app.setLoginItemSettings ({ openAtLogin: true });
}


// Create a Application Window
function createWindow() {
	mainWindow = new BrowserWindow ({
		x: 1510,
		y: 40,
		width: 400,
		height: 1000,
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


// Create a System Tray
function createTray() {
	mainTray = new Tray (path.join(__dirname, "../resources/icons", "tray.png"));

	const contextMenu = Menu.buildFromTemplate ([
		{ label: "Show", click: () => {
			mainWindow.show();
			mainWindow.webContents.send ("start-window-animation");
		}},
		{ label: "Exit", click: () => app.quit() }
	]);

	mainTray.setToolTip ("Rainpost");
	mainTray.setContextMenu (contextMenu);

	mainTray.on ("click", (_e, _bounds, _position) => {
		if (mainWindow != null) {
			mainWindow.show();
			mainWindow.webContents.send ("start-window-animation");
		} else {
			createWindow();
		}
	});
}


/* Renderer Event */
ipcMain.on ("close-window", () => mainWindow.hide());

ipcMain.on ("move-window", (_e, _position) => {
	console.log (_position);
	mainWindow.setPosition (_position["x"], _position["y"]);
});

/* Application Event */
app.once ("ready", () => init());
app.once ("window-all-closed", () => app.quit());
