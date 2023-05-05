// required modules
const { app, BrowserWindow } = require('electron');
const path = require('path');

// function to create a desktop window and initial window size
function createWindow() {
	const win = new BrowserWindow({
		width: 1366,
		height: 768,
		// Node integration
		webPreferences: {
			nodeIntegration: true
		}
	});

	// method to load the HTML file into the window
	win.loadFile('index.html');
}

// method to wait the app to be ready and calling of the function to create the window
app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

// close the windows
app.on('window-all-closed', () => {
	// note that MacOS systems, "closing a window" don't terminate the program, to do so you have to use specific commands and paths
	if (process.platform !== 'darwin') {
		app.quit();
	}
});