const {app, BrowserWindow} = require('electron');
const path = require('path');
let mainWindow;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1024, height: 768, webPreferences: {nodeIntegration: true, webviewTag: true} });
  mainWindow.loadURL('file://' + __dirname + '/browser.html');
  mainWindow.loadFile(path.join(__dirname, "C:/Users/vgvis/Downloads/electron/continous_image_full_scr_v3", 'popup.html'));
  mainWindow.openDevTools();
});
