chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'extractTagData') {
      var tag = request.tag.toLowerCase();
      var code = 'Array.from(document.getElementsByTagName("' + tag + '")).map(function(elem) { return elem.innerText; }).join("\\n")';
  
      chrome.tabs.executeScript(request.tabId, { code: code }, function(results) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          var tagData = results[0];
          sendResponse({ tagData: tagData });
        }
      });
  
      return true; // Indicates that the response will be sent asynchronously
    }
  });
  