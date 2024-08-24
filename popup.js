document.getElementById('startButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.local.get(['selectionRect'], (data) => {
      const selectionRect = data.selectionRect;
      if (selectionRect) {
        chrome.runtime.sendMessage({
          action: 'startCapture',
          tabId: tabs[0].id,
          selectionRect
        });
      } else {
        alert('Please select an area on the page first.');
      }
    });
  });
});

document.getElementById('stopButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'stopCapture' });
});
