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

    function updateVideoSpeed() {
        videos = document.querySelectorAll('video');
        if (speed <= 0.1) {
            speed = 0.1;
        }
        if (speed >= 8) {
            speed = 8;
        }
        for (let i = 0; i < videos.length; i++) {
            videos[i].playbackRate = speed;
        }
        browser.storage.local.set({ speed: speed });
    }

    speedField.onclick = () => {
        speed = 1;
        updateVideoSpeed();
    };

    sminusBtn.onclick = () => {
        speed -= 0.1;
        updateVideoSpeed();
    };

    minusBtn.onclick = () => {
        speed -= 0.5;
        updateVideoSpeed();
    };

    plusBtn.onclick = () => {
        speed += 0.5;
        updateVideoSpeed();
    };

    splusBtn.onclick = () => {
        speed += 0.1;
        updateVideoSpeed();
    };
    console.log(speed);
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(storageAccessed, onError);
