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

### 27 - Video Speed Controller

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
+ But if you're adding your event listener on the explicit element already, then _this_ has a clear definition and using _speed._ could be seen as __redundant and hard coded__.

```JavaScript
const playbackRate = percent * (max - min) + min;
```
+ Useful math to convert a percentage to a unit in a min–max context

+ __decimals.toFixed()__
