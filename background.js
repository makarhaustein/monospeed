function updateVideoSpeed(speed) {
    let videos = document.querySelectorAll('video');
    for (let i = 0; i < videos.length; i++) {
        videos[i].playbackRate = Number(speed);
    }
}

// Update speed when requested by popup
function catchMessage(request) {
    updateVideoSpeed(request.speed);
}

// Accesses speed
function syncSpeed() {
    const gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then(storageAccessed, onError);
}

// Update speed when requested by this file, either initialization or new elements coming in
function storageAccessed(stored) {
    let speed;
    if (!stored.speed) {
        browser.storage.local.set({ speed: 1 });
        speed = 1;
    } else {
        speed = stored.speed;
    }
    updateVideoSpeed(stored.speed);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Some sites (YT) don't make it clear when the video components are injected into the html,
// there is no uniform way to know when the page is fully loaded.
// Therefore => if body changes periodically check if new vids have been loaded.
const syncSometimes = (function() {
    var syncing = false;
    var resync = false;
    return async function() {
        if (!syncing) {
            syncing = true;
            // Looking for a changed "videos" array is probably less time efficient than simply adjusting
            // the speed, length of the array or simple equals comparison does not work.
            // It would be appropriate to track video urls and look for url changes, 
            // but I am unsure if that yields performance gains.
            // Youtube for example has a short video clip that it plays at the beginning and then quickly
            // replaces the url, here we would need to call playbackspeed again.
            syncSpeed();
            await sleep(200);
            if (resync == true) {
                resync = false;
                syncSometimes();
            }
            syncing = false;
        }
        else {
            resync = true;
        };
    };
})();

syncSometimes();

// Select the node that will be observed for mutations
const targetNode = document.querySelector("body");

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };

// Callback function to execute when mutations are observed 

const callback = () => { syncSometimes(); };
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

function onError(e) {
    console.error(e);
}

browser.runtime.onMessage.addListener(catchMessage);
