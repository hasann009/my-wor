let selectionRect = null;

document.addEventListener('mousedown', (event) => {
  const startX = event.clientX;
  const startY = event.clientY;

  function onMouseMove(e) {
    const rect = {
      left: Math.min(startX, e.clientX),
      top: Math.min(startY, e.clientY),
      width: Math.abs(startX - e.clientX),
      height: Math.abs(startY - e.clientY)
    };
    selectionRect = rect;
    document.getElementById('selection').style.cssText = `left: ${rect.left}px; top: ${rect.top}px; width: ${rect.width}px; height: ${rect.height}px;`;
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    chrome.storage.local.set({ selectionRect });
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Create a visual indicator for selection
const selectionDiv = document.createElement('div');
selectionDiv.id = 'selection';
selectionDiv.style.cssText = `
  position: absolute;
  border: 2px dashed red;
  pointer-events: none;
  z-index: 100000;
`;
document.body.appendChild(selectionDiv);
