// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Create a new browser window
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true // Allow using Node.js APIs in the renderer process
    }
  });

  // Load the extension's popup HTML file
  mainWindow.loadFile(path.join(__dirname, 'continous_image_full_scr_v3', 'popup.html'));
}

// When Electron has finished initializing, create the main window
app.whenReady().then(createWindow);
