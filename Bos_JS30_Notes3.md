# JavaScript30
__Lessons 17–__

### 17 - Sort Without Articles

__My solution__
```JavaScript
const regex = new RegExp('The |a |an ', 'i');

const deArticle = (input) => input.replace(regex, '');

const sortedBands = bands.sort((a, b) => deArticle(a) < deArticle(b) ? -1 : 1);
const listHTML = sortedBands.map(band => {
  return `
  <li>${band}</li>
  `
}).join('');

list.innerHTML = listHTML;
```
+ Initially had _g_ in regex, but since alphabetizing, only the first instance matters

__array.sort()__
+ Nice to use an inline ternary
+ Initially, I had the _deArticle_ logic inside the sort block, but it's a nice separation to move it outside

__Regex__
```JavaScript
bandName.replace(/^(a |the |an )/i, '').trim();
```
+ His __inline regex__ is nice
+ __trim()__: removes whitespace from both ends of a string

### 18 - Adding Up Times with Reduce

+ __reduce()__

__Hybrid solution__
```JavaScript
const videos = [...document.querySelectorAll('[data-time]')];

const convertTime = (minSec) => {
  const [mins, secs] = minSec.split(':').map(parseFloat)
  return (mins * 60) + secs;;
}

const timeSum = videos.reduce((acc, cur) => {
  return convertTime(cur.dataset.time) + acc;
}, 0);

let secondsLeft = timeSum;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft);
```
```JavaScript
const videos = [...document.querySelectorAll('[data-time]')];
```
+ No need to mess around with anything but these elements with these __data attributes__

```JavaScript
const [mins, secs] = minSec.split(':').map(parseFloat)
```
+ __Destructuring to declare variables__ from returned _spilt()_ value
+ __map(parseFloat)__ runs _parseFloat_ on every item in the array

__Modulo/Remainder__

+ _73 % 60 = 13_
  + As in, _how many seconds remain beyond whole minutes_
  + __secondsLeft__ above

### 19 - Webcam Fun

+ Browser sync start script!
  + Easy hot reloading. No global install
  + Check on mobile???
