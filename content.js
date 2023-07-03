// content.js

// Function to extract and save the source code under the specified div class
function extractAndSaveData(divClassName) {
  const divElement = document.querySelector('.' + divClassName);

  if (divElement) {
    const sourceCode = divElement.innerHTML;

    // Create a Blob with the source code as plain text
    const blob = new Blob([sourceCode], { type: 'text/plain' });

    // Create a temporary anchor element to download the file
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'data.txt'; // Specify the file name here

    // Programmatically click on the anchor element to initiate the download
    anchor.click();

    // Clean up the URL.createObjectURL by revoking the object URL
    URL.revokeObjectURL(anchor.href);
  }
}

// Function to handle URL changes and reset the extraction functionality
function handleUrlChange() {
  const observer = new MutationObserver(function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        resetExtractionFunctionality();
        break;
      }
    }
  });

  observer.observe(document, { childList: true, subtree: true });

  function resetExtractionFunctionality() {
    observer.disconnect();

    chrome.runtime.onMessage.removeListener(messageListener);

    setupExtractionFunctionality();
  }
}

// Function to set up the extraction functionality
function setupExtractionFunctionality() {
  chrome.runtime.onMessage.addListener(messageListener);

  function messageListener(request, sender, sendResponse) {
    if (request.message === 'extractData') {
      const divClassName = request.divClassName;
      extractAndSaveData(divClassName);
      sendResponse({ success: true });
    }
  }
}

// Initialize the extraction functionality
setupExtractionFunctionality();
handleUrlChange();
