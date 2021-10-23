const video = document.querySelector('.js-video');
const allBtns = document.querySelectorAll('.btn');
const playBtn = document.querySelector('.js-play-btn');
const pauseBtn = document.querySelector('.js-pause-btn');
const stopBtn = document.querySelector('.js-stop-btn');
const speeds = document.querySelectorAll('.js-speeds');
const progressBar = document.querySelector('.js-progress');
const controlsWrapper = document.querySelector('.js-controls-wrapper');
const videoWrapper = document.querySelector('.js-video-wrapper');
const volumeSlider = document.querySelector('.js-volume-slider');
const muted = document.querySelector('.js-muted');
const fullScreen = document.querySelector('.js-fs-button');


// regulate speed of the video
function speedPlayback(speed) {
	video.playbackRate = speed;
}

// fill progres bar base on the current time from video
function updateProgress() {
	progressBar.value = (video.currentTime / video.duration) * 100;
}

// change video current time when click on progress bar
function setVideoProgress() {
	video.currentTime = (+progressBar.value * video.duration) / 100;
}

// change play/pause button 
playBtn.addEventListener('click', function() {
	let playPause = this.querySelector('i');
	
	if (playPause.classList.contains('fa-play')) {
		playPause.classList.remove('fa-play');
		playPause.classList.add('fa-pause');
		
		video.play();
	} else {
		playPause.classList.remove('fa-pause')
		playPause.classList.add('fa-play');
		
		video.pause();
	}
});

// add funtionality on speedy buttons based on data atribute in html
speeds.forEach(speed => {
	speed.addEventListener('click', function(e) {
		// console.log(e.target.dataset.speed);
		speedPlayback(+e.target.dataset.speed);
	});
});


video.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('change', setVideoProgress)

// show controls when hover over video
videoWrapper.addEventListener('mouseover', function() {
	controlsWrapper.classList.add('active');
});

// hide controls when leave video
videoWrapper.addEventListener('mouseout', function() {
	controlsWrapper.classList.remove('active');
});

// set video volume
volumeSlider.addEventListener('change', function() {
	video.volume = volumeSlider.value / 100;
})

// mute video and set volume slider based on current volume
muted.addEventListener('click', function() {
	let currentVolume = video.volume;	
	
	if (this.textContent === 'Mute') {
		this.textContent = 'Unmute';
		video.muted = true;
		volumeSlider.value = 0;
	} else {
		this.textContent = 'Mute';
		video.muted = false;
		volumeSlider.value = currentVolume * 100;
	}
})

// enter full screen mode
fullScreen.addEventListener('click', function() {
	video.requestFullscreen();
})