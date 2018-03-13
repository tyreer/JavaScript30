# JavaScript30
__Lessons 27–30__

### 27 - Click and Drag

```JavaScript
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;  // stop the fn from running
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
});
```
+ __mouseleave__ to halt dragging if mouse leaves the div being scrolled
+ __console.count__ useful with _mousemove_ listener
+ __console.log({x, startX})__ very useful for multiple logs
+ __cursor: grabbing__
+ _preventDefault_ helps avoid default dragging cursor behaviour like selecting text, etc.

```JavaScript
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;  // stop the fn from running
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
});
```
+ _e.pageX - slider.offsetLeft_ = where the mousedown occurred minus the context of the div's offset on the page

### 28 - Video Speed Controller

```JavaScript
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

function handleMove(e) {
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const min = 0.4;
    const max = 4;
    const height = Math.round(percent * 100) + '%';
    const playbackRate = percent * (max - min) + min;
    bar.style.height = height;
    bar.textContent = playbackRate.toFixed(2) + '×';
    video.playbackRate = playbackRate;
  }

speed.addEventListener('mousemove', handleMove);
```
__Wes:__
```JavaScript
const y = e.pageY - this.offsetTop;
const percent = y / this.offsetHeight;
```
__Me:__
```JavaScript
const percentageInBar = (e.pageY - speed.offsetTop) / speed.offsetHeight;
```
+ __Using _this_ to allow a more reusable function__. I used the element (_speed_), which seems more concrete and works just fine. I'd feel a bit nervous about _this_ here because it feels less specific and more prone to potential error.
+ But if you're adding your event listener on the explicit element already, then _this_ has a clear definition and using _speed_ could be seen as __redundant and hard coded__.

```JavaScript
const playbackRate = percent * (max - min) + min;
```
+ Useful math to convert a percentage to a unit in a min–max context

+ __decimals.toFixed()__

### 29 - Countdown Clock

```JavaScript
const buttons = document.querySelectorAll('[data-time]');
```
+ Data attribute as specific, declarative selector

```JavaScript
let countdown;

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}
```
+ __Avoid decrement within setInterval__ because occasionally no fire and iOS scrolling halts interval timer
+ Solution here is to use the _fixed end time_ along with _Date.now_ inside the timer, so it doesn't really matter if a cycle is skipped because the next second will return an accurate value

```JavaScript
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}
```
```JavaScript
document.title = display;
```
+ Allows browser tab to show timer value

```JavaScript
const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
```
+ __Ternary__ to solve __2-digit seconds__
+ Only saving this in _display_ because it will be used in two places, otherwise inline, as below

```JavaScript
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
```

```HTML
<form name="customForm" id="custom">
  <input type="text" name="minutes" placeholder="Enter Minutes">
</form>
```

```JavaScript
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
```
+ Using reset to take advantage of native form features (rather than saying something like _value=''_)
+ Can use __name attribute__ off of _this.minutes.value_

### 30 - Whack A Mole

```JavaScript
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
```

```JavaScript
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Ah nah thats the same one bud');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}
```

```JavaScript
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}
```
+ Appreciate the small functions. My work mixed the above concerns of randomHole + peep, which made it tricky to follow.

```JavaScript
setTimeout(() => timeUp = true, 10000)
```
+ __Inline timeout__

```JavaScript
if (!timeUp) peep();
```
+ __Inline if__

+ Careful not to confuse __setTimeout()__ and __setInterval()__!
+ Helpful in this instance to avoid passing in parameter for the _timeUp_ condition.
  + I was passing this condition in and it allowed the undesired value to "leapfrog" the desired canceling condition and continue an indefinite loop
