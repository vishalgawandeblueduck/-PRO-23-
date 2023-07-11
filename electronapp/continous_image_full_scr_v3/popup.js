let screenshotIntervalId;
let stopTimeoutId;

function startScreenshots() {
  screenshotIntervalId = setInterval(() => {
    chrome.tabs.captureVisibleTab(null, {}, (dataUrl) => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'screenshot.png';
      link.click();
    });
  }, 1000);

  document.getElementById('start-screenshots').disabled = true;
  document.getElementById('stop-screenshots').disabled = false;

  // Stop taking screenshots automatically after 10 seconds
  stopTimeoutId = setTimeout(stopScreenshots, 3000);
}

function stopScreenshots() {
  clearInterval(screenshotIntervalId);
  clearTimeout(stopTimeoutId);

  document.getElementById('start-screenshots').disabled = false;
  document.getElementById('stop-screenshots').disabled = true;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-screenshots').addEventListener('click', startScreenshots);
  document.getElementById('stop-screenshots').addEventListener('click', stopScreenshots);
});
