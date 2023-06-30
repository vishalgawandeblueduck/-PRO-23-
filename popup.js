document.addEventListener('DOMContentLoaded', function() {
  var extractButton = document.getElementById('extractButton');

  extractButton.addEventListener('click', function() {
    var tag = document.getElementById('tagInput').value;
    if (tag.trim() === '') {
      alert('Please enter a valid tag name.');
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var tab = tabs[0];
      chrome.runtime.sendMessage({ action: 'extractTagData', tabId: tab.id, tag: tag }, function(response) {
        downloadTagData(response.tagData, tag);
      });
    });
  });

  function downloadTagData(data, tag) {
    var filename = tag + '_data.txt';
    var blob = new Blob([data], { type: 'text/plain' });

    chrome.downloads.download({
      url: URL.createObjectURL(blob),
      filename: filename,
      saveAs: true
    });
  }
});
