let isRecording = false;
let intervalId;
let stopTimeoutId;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'startScreenshot') {
    if (!isRecording) {
      isRecording = true;
      sendResponse({ result: 'success' }); // Notify the popup script

      const captureAndDownloadScreenshot = function () {
        chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataUrl) {
          const image = new Image();
          image.src = dataUrl;

          image.onload = function () {
            const captureWidthPercent = 35; // Adjust the width percentage of the capture area
            const captureHeightPercent = 45; // Adjust the height percentage of the capture area

            const captureWidth = Math.round(image.width * (captureWidthPercent / 100));
            const captureHeight = Math.round(image.height * (captureHeightPercent / 100));
            const offsetX = Math.round((image.width - captureWidth) / 2);
            const offsetY = Math.round((image.height - captureHeight) / 1.8);

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = captureWidth;
            canvas.height = captureHeight;

            context.drawImage(
              image,
              offsetX,
              offsetY,
              captureWidth,
              captureHeight,
              0,
              0,
              captureWidth,
              captureHeight
            );

            const croppedDataUrl = canvas.toDataURL('image/png');

            const fileName = 'screenshot_' + Date.now() + '.png';
            chrome.downloads.download({ url: croppedDataUrl, filename: fileName });
          };
        });
      };

      // Capture the initial screenshot immediately
      captureAndDownloadScreenshot();

      // Continuously capture and download screenshots
      intervalId = setInterval(captureAndDownloadScreenshot, 2000);

      // Stop capturing screenshots after 10 seconds
      stopTimeoutId = setTimeout(function () {
        stopRecording();
      }, 10000);
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
    intervalId = null; // Reset intervalId
    stopTimeoutId = null; // Reset stopTimeoutId
  }
}
