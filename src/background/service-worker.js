/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((value) => {
    if (value.type === "get") {
      chrome.storage.sync.get(["QUOTE-CALC-VALUE"]).then((result) => {
        port.postMessage(result["QUOTE-CALC-VALUE"]);
      });
    } else if (value.type === "set") {
      chrome.storage.sync.set({ "QUOTE-CALC-VALUE": value }).then(() => {
        console.log("Value is set");
      });
    }
  });
});
