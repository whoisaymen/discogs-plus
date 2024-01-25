let extensionEnabled = true;

chrome.action.onClicked.addListener((tab) => {
  extensionEnabled = !extensionEnabled;

  if (extensionEnabled) {
    chrome.action.setIcon({ path: "images/icon-16.png", tabId: tab.id });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
  } else {
    chrome.action.setIcon({
      path: "images/icon-disabled-16.png",
      tabId: tab.id,
    });
    chrome.tabs.reload(tab.id);
  }
});
