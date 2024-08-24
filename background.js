let captureIntervalId = null;
let selectionRect = null;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'startCapture') {
    selectionRect = message.selectionRect;
    if (captureIntervalId) clearInterval(captureIntervalId);
    captureIntervalId = setInterval(() => {
      chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        func: () => {
          chrome.runtime.sendMessage({ action: 'takeScreenshot' });
        }
      });
    }, 2000); // Take a screenshot every 2 seconds
  } else if (message.action === 'stopCapture') {
    if (captureIntervalId) clearInterval(captureIntervalId);
    captureIntervalId = null;
  } else if (message.action === 'takeScreenshot') {
    chrome.tabs.captureVisibleTab({ format: 'png' }, (dataUrl) => {
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          chrome.downloads.download({
            url: url,
            filename: `screenshot_${Date.now()}.png`
          });
        });
    });
  }
});
