const frames = ["assets/frame1.png", "assets/frame2.png", "assets/frame1.png", "assets/frame3.png"];
let animationTimeout;

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

function tabbyAnim(frame = 0, loop = 0) {
    chrome.action.setIcon({ path: frames[frame] });
    frame = (frame + 1) % frames.length;

    if (frame == 0) {
        loop++;
    }

    if (loop < 1) {
        animationTimeout = setTimeout(() => tabbyAnim(frame, loop), 200);
    } else {
        setTimeout(() => chrome.action.setIcon({ path: frames[0] }), 200);
    }
}

function sleepTabs() {
    clearTimeout(animationTimeout);

    tabbyAnim();

    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(suspendTab);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cookie').addEventListener('click', sleepTabs);
});