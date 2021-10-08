const song = {
    img : document.querySelector('img'),
    title : document.querySelector('#title'),
    artist : document.getElementById('artist')
};

const controls = {
    play : document.querySelector('#play'),
    prev : document.querySelector('#prev'),
    next : document.querySelector('#next')
};

const playButton = document.getElementById('play');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

const songs = [
    {
        name : 'music-1',
        displayName : 'Electric Chill Machine',
        artist : 'aes'
    },
    {
        name : 'music-2',
        displayName : 'Seven Nation Army (Remix)',
        artist : 'aes'
    },
    {
        name : 'music-3',
        displayName : 'Goodnight, Disco Queen!',
        artist : 'aes'
    },
    {
        name : 'metric-1',
        displayName : 'Front Row',
        artist : 'Metric/aes'
    }
]

//* Current Song
let songIndex = 0;

let isPlaying = false;

//* Previous Song
function prevSong(){
    songIndex--;
    if(songIndex === -1) songIndex = songs.length-1;
    loadSong(songs[songIndex]);
    playSong();
}

//* Next Song
function nextSong(){
    songIndex++;
    if(songIndex === songs.length) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

// Play Music
function playSong(){
    isPlaying = true;
    controls.play.classList.replace('fa-play', 'fa-pause');
    controls.play.setAttribute('title', 'Pause');
    music.play();
}

// Pause Music
function pauseSong(){
    isPlaying = false;
    controls.play.classList.replace('fa-pause', 'fa-play');
    controls.play.setAttribute('title', 'Play');
    music.pause();
}

//! Play or Pause Event Listener
controls.play.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//! Next - Prev Songs
controls.prev.addEventListener('click', prevSong);
controls.next.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);

function updateProgressBar(e) {
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        //* Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //* Calculate duration of song
        let durationOfSong = {
            minute : Math.floor(duration / 60),
            seconds : (Math.floor(duration % 60) < 10) ? `0${Math.floor(duration % 60)}` : Math.floor(duration % 60),
        }
        //* Delay until calculate duration
        if(durationOfSong.seconds){
            durationDisplay.textContent = `${durationOfSong.minute}:${durationOfSong.seconds}`;
        }
        //* Calculate duration of song
        let currentTimeOfSong = {
            minute : Math.floor(currentTime / 60),
            seconds : (Math.floor(currentTime % 60) < 10) ? `0${Math.floor(currentTime % 60)}` : Math.floor(currentTime % 60),
        }
        //* Delay until calculate currentTime
        if(currentTimeOfSong.seconds){
            currentTimeDisplay.textContent = `${currentTimeOfSong.minute}:${currentTimeOfSong.seconds}`;
        }
    }
}

//! Music time update
music.addEventListener('timeupdate', updateProgressBar);

//! Set Progress Bar Function
function setProgressBar(e){
    const width = this.clientWidth;
    const currentX = e.offsetX;
    const { duration } = music;
    music.currentTime = (currentX / width) * duration;
    music.play();
}

//! Set Progress Bar
progressContainer.addEventListener('click', setProgressBar);

//* Update DOM
function loadSong(currentSong){
    song.title.textContent = currentSong.displayName;
    song.artist.textContent = currentSong.artist;
    music.src = `music/${currentSong.name}.mp3`;
    song.img.src = `img/${currentSong.name}.jpg`;
}

//* On Load - Select First Song
loadSong(songs[songIndex]);