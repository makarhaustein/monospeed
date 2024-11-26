/*
Generic error logger.
*/
function onError(e) {
    console.error(e);
}

function storageAccessed(stored) {
    const plusBtn = document.getElementById('plus-btn');
    const minusBtn = document.getElementById('minus-btn');
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
        for (let i = 0; i < videos.length; i++) {
            videos[i].playbackRate = speed;
        }
        browser.storage.local.set({ speed: speed });

        console.log(`New video speed: ${speed}`);
    }

    plusBtn.onclick = () => {
        speed += 0.5;
        updateVideoSpeed();
    };

    minusBtn.onclick = () => {
        speed -= 0.5;
        updateVideoSpeed();
    };

    console.log(speed);
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(storageAccessed, onError);
