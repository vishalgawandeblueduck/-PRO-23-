// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const downloadButton = document.getElementById('downloadButton');
  
    downloadButton.addEventListener('click', function () {
      const tagInput = document.getElementById('tagInput');
      const imageTag = tagInput.value;
  
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'findImageByTag', tag: imageTag });
      });
    });
  });
  