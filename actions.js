
const currentHostname = new URL(window.location.href).hostname;

console.log('Hostname [' + currentHostname + ']');

if (currentHostname === 'www.twitch.tv') {
    console.log('Running script on twitch');

    let ariaLabelText = 'Claim Bonus';
    let buttonHintText = 'Click to claim a bonus!';

    if (document.documentElement.lang === 'ru-RU') {
        ariaLabelText = 'Получить бонус';
        buttonHintText = 'Щелкните, чтобы получить бонус!';
    }

    setInterval(
        function(){
            const buttonList = document.querySelectorAll(
                'section div.chat-input div.chat-input__buttons-container div.community-points-summary button[aria-label="' + ariaLabelText + '"]'
            );

            if (buttonList.length > 0) {
                if (buttonList.length === 1) {
                    const buttonGetBonus = buttonList[0];
                    const buttonHint = buttonGetBonus.nextElementSibling;

                    if (buttonHint) {
                        if (buttonHint.textContent === buttonHintText) {
                            buttonGetBonus.click();
                            console.log('Clicked');
                        } else {
                            console.error('Invalid hint text: [' + buttonHint.textContent + ']');
                        }
                    } else {
                        console.error('No button hint');
                    }
                } else {
                    console.error('Too much buttons [' + buttonList.length + ']');
                }
            } else {
                console.log('Not Found');
            }
        },
        10000
    );

    if (window.onclick) {
        console.log('Window onclick event is in use. Please re-check the script');
    } else {
        const addMyPictureInPictureButton = function() {
            const MY_BUTTON_PICTURE_IN_PICTURE_ID = 'myButtonPictureInPictureId';

            if (document.getElementById(MY_BUTTON_PICTURE_IN_PICTURE_ID)) {
                return;
            }

            const playerControlList = document.querySelectorAll('#channel-player div.player-controls__right-control-group');
            if (playerControlList.length === 0) {
                return;
            }

            if (playerControlList.length === 2) {
                playerControlList.forEach(playerControl => {
                    const myDiv = document.createElement('div');

                    const myButton = document.createElement('button');
                    myButton.className = 'dOOPAe';
                    myButton.setAttribute('id', MY_BUTTON_PICTURE_IN_PICTURE_ID);
                    myButton.onclick = function() {
                        const videoList = document.querySelectorAll('video');
                        if (videoList.length === 1) {
                            videoList[0].requestPictureInPicture();
                        } else {
                            console.error('Single video was not found. Count: [' + videoList.length + ']');
                        }
                    };

                    myDiv.append(myButton);

                    playerControl.appendChild(myDiv);

                    console.log('My PIP button added');
                });
            } else {
                console.log('For some reason no 2 payer controls (visible + hidden). Count: [' + playerControlList.length + ']');
            }
        }

        window.onclick = addMyPictureInPictureButton;
    }
} else {
    console.log('No script for this site');
}
