function onError(e) {
    console.error(e);
}

function catchMessage(request) {
    updateVideoSpeed(request.speed);
}

function updateVideoSpeed(speed) {
    videos = document.querySelectorAll('video');
    for (let i = 0; i < videos.length; i++) {
        videos[i].playbackRate = Number(speed);
    }
}

// Sync with the current video speed when opening new tab
function storageAccessed(stored) {
    let speed;
    if (!stored.speed) {
        browser.storage.local.set({ speed: 1 });
        speed = 1;
    } else {
        speed = stored.speed;
    }
    updateVideoSpeed(stored);
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(storageAccessed, onError);

browser.runtime.onMessage.addListener(catchMessage);
