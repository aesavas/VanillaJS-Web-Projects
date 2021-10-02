const videoPlayer = document.querySelector('#video');
const button = document.querySelector('#button');

//* Prompt to select media stream, pass to video element, then play
async function selectMediaStream(){
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoPlayer.srcObject = mediaStream;
        videoPlayer.onloadedmetadata = () => {
            videoPlayer.play();
        }
    } catch (error) {
        alert(error);
    }
}

button.addEventListener('click', async () => {
    // Disable Button
    button.disabled = true;
    // Start Picture in Picture
    await videoPlayer.requestPictureInPicture();
    // Reset Button
    button.disabled = false;
});

selectMediaStream();