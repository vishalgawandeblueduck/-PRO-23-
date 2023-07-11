let isRecording = false;
let intervalId;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'startScreenshot') {
    if (!isRecording) {
      isRecording = true;
      sendResponse({ result: 'success' }); // Notify the background script
      startRecording();
    }
  } else if (message.action === 'stopScreenshot') {
    if (isRecording) {
      isRecording = false;
      stopRecording();
    }
  }
});

function startRecording() {
  intervalId = setInterval(captureScreenshot, 5000);
  captureScreenshot(); // Capture the initial screenshot
}

function stopRecording() {
  clearInterval(intervalId);
}

function captureScreenshot() {
  chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataUrl) {
    const fileName = 'screenshot_' + Date.now() + '.png';
    chrome.downloads.download({ url: dataUrl, filename: fileName });
  });
}
