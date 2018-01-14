/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build out functions */
console.dir(video);

const togglePlay = () => {
  video.paused
  ? video.play()
  : video.pause();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';

  toggle.textContent = icon;
}

function skip() {
  video.currentTime = video.currentTime + parseInt(this.dataset.skip);
}

function scrub(e) {
  const videoStart = this.getBoundingClientRect().x;
  const clickedPosition = e.clientX;
  const clickInProgress = clickedPosition - videoStart;
  const videoWidth = parseFloat(video.clientWidth)
  const percentageClicked = clickInProgress/videoWidth;
  const playback = percentageClicked * video.duration;

  video.currentTime = playback;
  progressBar.style.flexBasis = `${percentageClicked * 100}%`;
}



/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

progress.addEventListener('click', scrub);
