chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'scrapeTitle') {
    var title = document.querySelector('title').innerText;
    sendResponse({ data: title });
  }
});
