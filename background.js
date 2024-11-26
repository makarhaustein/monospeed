function updateVideoSpeed(request) {
    videos = document.querySelectorAll('video');
    console.log(request);
    for (let i = 0; i < videos.length; i++) {
        videos[i].playbackRate = Number(request.speed);
    }
}

browser.runtime.onMessage.addListener(updateVideoSpeed);
