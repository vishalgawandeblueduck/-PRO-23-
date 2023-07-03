// background.js

// Function to send a message to the content script to extract data
function sendMessageToContentScript(tabId, divClassName) {
  chrome.tabs.sendMessage(tabId, { message: 'extractData', divClassName: divClassName }, function (response) {
    if (response && response.success) {
      console.log('Data extraction successful!');
    } else {
      console.log('Data extraction failed.');
    }
  });
}

// Listen for clicks on the extension's toolbar button
chrome.browserAction.onClicked.addListener(function (tab) {
  const divClassName = prompt('Enter the class name of the div:');
  if (divClassName) {
    sendMessageToContentScript(tab.id, divClassName);
  }
});
