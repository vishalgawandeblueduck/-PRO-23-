// Send a message to the Electron app
const croppedDataUrl = canvas.toDataURL('image/png');
window.postMessage({ action: 'messageFromExtension', dataUrl: croppedDataUrl }, '*');
