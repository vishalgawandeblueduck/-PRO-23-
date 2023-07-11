var interval = chrome.storage.local.get("default_interval") || 1000;
var directory = chrome.storage.local.get("default_directory") || "screenshots";

function takeScreenshot() {
  chrome.desktopCapture.captureEntireScreen(function(streamId) {
    chrome.tabs.executeScript(null, {file: "screenshot.js", args: [streamId]});
  });
}

setInterval(takeScreenshot, interval);