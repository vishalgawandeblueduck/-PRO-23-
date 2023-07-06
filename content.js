chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'startScreenshot') {
    // Capture the screenshot and send it to the target webpage
    chrome.tabs.captureVisibleTab({ format: 'png' }, function (screenshotUrl) {
      const targetUrl = sender.tab.url; // Get the URL of the current tab
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://your-target-webpage.com/receive-screenshot', true); // Replace with the target webpage's screenshot receiving URL
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send('screenshot=' + encodeURIComponent(screenshotUrl) + '&url=' + encodeURIComponent(targetUrl));
    });
  }
});
