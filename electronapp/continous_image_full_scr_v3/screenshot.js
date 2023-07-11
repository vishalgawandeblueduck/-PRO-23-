var streamId = arguments[0];
var imageData = await chrome.desktopCapture.getScreenshotData(streamId);
var fileName = new Date().getTime() + ".png";
var directory = chrome.storage.local.get("default_directory") || "screenshots";
var savePath = directory + "/" + fileName;
await chrome.fileSaver.saveData(imageData, savePath);