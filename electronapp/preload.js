const { ipcRenderer } = require('electron');

// Listen for messages from the Chrome extension
ipcRenderer.on('messageFromExtension', function (event, message) {
  // Handle the message from the extension
});
