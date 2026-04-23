let startupMode = true;

setTimeout(() => startupMode = false, 2000);

async function suspendTab(tab) {
  if (!startupMode) return;

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

chrome.runtime.onStartup.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(suspendTab);
  });
});
