const buttons = document.querySelectorAll('.timer__button');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
let countdown;

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = (seconds % 60);
  const display = `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;

  timeLeft.innerText = display;
  document.title = display;
}

function displayEndTime(timestamp){
  const end = new Date(timestamp);
  const displayEndTime = `Be back: ${end.getHours()}:${end.getMinutes()}`;
  endTime.innerText = displayEndTime;
}

function startTimer(){
  const seconds = parseInt(this.dataset.time)
  timer(seconds);
}

buttons.forEach(button => {button.addEventListener('click', startTimer)})

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.minutes.value = '';
  this.reset();
})

// click set data-time attribute as timer

// Set timeout 1000
// inner text set

// const buttons = document.querySelectorAll('.timer__button');
// const timeLeft = document.querySelector('.display__time-left');
// const endTime = document.querySelector('.display__end-time');
// let timerSeconds;
// let timerId;
//
// function setTimer() {
//   window.clearTimeout(timerId);
//   timerSeconds = this.dataset.time;
//
//   updateTimer();
//   setBeBack();
// }
//
// function updateTimer() {
  // const minutes = Math.floor(timerSeconds / 60);
  // const seconds = (timerSeconds % 60);
  //
  // timeLeft.innerText = `${minutes}:${seconds}`;
//
//   if (timerSeconds > 0) {
//       timerId = window.setTimeout(() => {
//       timeLeft.innerText = `${minutes}:${seconds}`;
//       timerSeconds--;
//       updateTimer()
//     }, 1000)
//   }
// }
//
// function setBeBack() {
//   const now = parseFloat(new Date().getTime());
//   const timerSecondsInt = parseFloat(timerSeconds);
//   const beBackTime = now + timerSecondsInt;
//   const beBackDate = new Date(beBackTime);
//
//   const beBackHour = beBackDate.getHours();
//   const beBackMinute = beBackDate.getMinutes();
//
//
//   // console.log({beBackHour, beBackMinute});
//
//   // const beBackTime = `${currentHour + }`
//   // endTime.innerText =
// }
//
//
// buttons.forEach(button => {button.addEventListener('click', setTimer)})
