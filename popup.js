document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  let isRecording = false;

  startButton.addEventListener('click', function () {
    if (!isRecording) {
      isRecording = true;
      startButton.textContent = 'Stop';
      chrome.runtime.sendMessage({ action: 'startScreenshot' });
    } else {
      isRecording = false;
      startButton.textContent = 'Start';
      chrome.runtime.sendMessage({ action: 'stopScreenshot' });
    }
  });
});
