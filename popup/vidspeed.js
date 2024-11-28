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
        speed = 1.0;
    } else {
        speed = stored.speed;
    }

    function updateSpeedCheck(tabs) {
        if (speed <= 0.1) {
            speed = 0.1;
        }
        if (speed >= 8.0) {
            speed = 8.0;
        }
        for (const tab of tabs) {
            browser.tabs.sendMessage(tab.id, { speed: speed });
        }
        speedField.innerHTML = speed.toFixed(1);
        browser.storage.local.set({ speed: speed });
    }

    function getTabs() {
        return browser.tabs.query({ currentWindow: true });
    }

    speedField.onclick = () => {
        speed = 1.0;
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

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(storageAccessed, onError);
