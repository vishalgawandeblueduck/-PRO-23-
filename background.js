let isRecording = false;
let intervalId;
let stopTimeoutId;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'startScreenshot') {
    if (!isRecording) {
      isRecording = true;
      sendResponse({ result: 'success' }); 

      const captureAndDownloadScreenshot = function () {
        chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataUrl) {
          const fileName = 'screenshot_' + Date.now() + '.png';
          chrome.downloads.download({ url: dataUrl, filename: fileName });
        });
      };

      
      captureAndDownloadScreenshot();

      // interval timer
      intervalId = setInterval(captureAndDownloadScreenshot, 2000);

      // stopping timer
      stopTimeoutId = setTimeout(function () {
        stopRecording();
      }, 20000);
    }
  } else if (message.action === 'stopScreenshot') {
    stopRecording();
  }
});

function stopRecording() {
  if (isRecording) {
    isRecording = false;
    clearInterval(intervalId);
    clearTimeout(stopTimeoutId);
    intervalId = null; 
    stopTimeoutId = null; 
  }
}
