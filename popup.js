const frames = ["assets/frame2.png", "assets/frame1.png", "assets/frame3.png"];
let animationTimeout;

function tabbyAnim(frame = 0, loop = 0) {
    chrome.action.setIcon({ path: frames[frame] });
    frame = (frame + 1) % frames.length;

    if (frame == 0) {
        loop++;
    }

    if (loop < 1) {
        animationTimeout = setTimeout(() => tabbyAnim(frame, loop), 200);
    } else {
        setTimeout(() => chrome.action.setIcon({ path: frames[1] }), 200);
    }
}

function sleepTabs() {
    clearTimeout(animationTimeout);

    tabbyAnim();
    suspendAll();
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cookie').addEventListener('click', sleepTabs);
});