async function suspendTab(tab) {
  const url = tab.url || "";
  if (
    url === "" ||
    url.startsWith("brave://") ||
    url.startsWith("chrome://") ||
    url.startsWith("about:")
  ) return;

  if (tab.active || !tab.autoDiscardable) return;
  chrome.tabs.discard(tab.id);
}

function suspendAll() {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(suspendTab)
  });
};