
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: function () {
            const videoTagList = document.getElementsByTagName('video');
            if (videoTagList.length === 1) {
                const video = videoTagList[0];
                if (video.getAttribute('isInPipMode') === 'true') {
                    video.setAttribute('isInPipMode', false);

                    document.exitPictureInPicture()
                        .then(() => console.log('Exited from PIP mode'))
                        .catch((err) => console.log('Failed to exit PIP mode: ' + err.message));
                } else {
                    video.setAttribute('isInPipMode', true);

                    video.removeAttribute('disablePictureInPicture');
                    video.requestPictureInPicture();
                }
            } else {
                console.log('Single video tag was not found: [' + videoTagList.length + ']');
            }
        }
    });
});
