/*
Generic error logger.
*/

function onError(e) {
    console.error(e);
}

function storageAccessed(stored) {
    const speedField = document.getElementById('speed-field');
    const sminusBtn = document.getElementById('small-minus-btn');
    const minusBtn = document.getElementById('minus-btn');
    const plusBtn = document.getElementById('plus-btn');
    const splusBtn = document.getElementById('small-plus-btn');
    /*
    On popup start, check whether we have stored settings.
    If we don't, then set speed to 1.
    */
    let speed;

    if (!stored.speed) {
        browser.storage.local.set({ speed: 1 });
        speed = 1;
    } else {
        speed = stored.speed;
    }

    function updateSpeedCheck(tabs) {
        if (speed <= 0.1) {
            speed = 0.1;
        }
        if (speed >= 8) {
            speed = 8;
        }
        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, { speed: speed });
        }
        browser.storage.local.set({ speed: speed });
        console.log(speed);
        console.log(tabs.length);

    }

    function getTabs() {
        return browser.tabs.query({ currentWindow: true });
    }

    speedField.onclick = () => {
        speed = 1;
        getTabs().then(updateSpeedCheck, onError);
    };

    sminusBtn.onclick = () => {
        speed -= 0.1;
        getTabs().then(updateSpeedCheck, onError);
    };

    minusBtn.onclick = () => {
        speed -= 0.5;
        getTabs().then(updateSpeedCheck, onError);
    };

    plusBtn.onclick = () => {
        speed += 0.5;
        getTabs().then(updateSpeedCheck, onError);
    };

    splusBtn.onclick = () => {
        speed += 0.1;
        getTabs().then(updateSpeedCheck, onError);
    };
    getTabs().then(updateSpeedCheck, onError);
}

function getStoredSetting() {
    const gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then(storageAccessed, onError);
}
const executing = browser.tabs
    .executeScript({ file: "/background.js" })
    .then(getStoredSetting, onError);
