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


function playVideo() {
	if (playBtn.querySelector('i').classList.contains('fa-play')) {
		playBtn.querySelector('i').classList.remove('fa-play');
		playBtn.querySelector('i').classList.add('fa-pause');
		video.play();
	} else {
		playBtn.querySelector('i').classList.remove('fa-pause')
		playBtn.querySelector('i').classList.add('fa-play');
		video.pause();
	}
}

function seekTo(position) {
	video.currentTime = position;
}

function speedPlayback(speed) {
	video.playbackRate = speed;
}

function updateProgress() {
	progressBar.value = (video.currentTime / video.duration) * 100;
}

function setVideoProgress() {
	video.currentTime = (+progressBar.value * video.duration) / 100;
}

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


speeds.forEach(speed => {
	speed.addEventListener('click', function(e) {
		// console.log(e.target.dataset.speed);
		speedPlayback(+e.target.dataset.speed);
	});
});

// progressBar.addEventListener('change', setVideoProgress)

video.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('change', setVideoProgress)

videoWrapper.addEventListener('mouseover', function() {
	controlsWrapper.classList.add('active');
});

videoWrapper.addEventListener('mouseout', function() {
	controlsWrapper.classList.remove('active');
});

volumeSlider.addEventListener('change', function() {
	video.volume = volumeSlider.value / 100;
})


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

fullScreen.addEventListener('click', function() {
	video.requestFullscreen();
})