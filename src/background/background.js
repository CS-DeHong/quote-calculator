/* eslint-disable no-undef */

// function sendMessageToContentScript(message, callback) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
//       if (callback) callback(response);
//     });
//   });
// }

// chrome.contextMenus.create({
//   id: "send_panel",
//   title: "使用侧边栏处理：%s", // %s表示选中的文字
//   contexts: ["selection"], // 只有当选中文字时才会出现此右键菜单
// });
// chrome.contextMenus.onClicked.addListener(function (params) {
//   if (params.menuItemId == "send_panel") {
//     console.log(params.selectionText);
//     sendMessageToContentScript({ cmd: "test", value: params.selectionText }, function (response) {
//       console.log("来自content的回复：" + response);
//     });
//   }
// });

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;

  await chrome.sidePanel.setOptions({
    tabId,
    path: "popup.html",
    enabled: true,
  });
});

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
