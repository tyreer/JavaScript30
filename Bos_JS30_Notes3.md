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

__See projects files.__ A bit niche but a great demo

__Take aways:__
+ Using __canvas__ with a video stream source
  + _getContext()_, _drawImage()_, _toDataURL()_, _getImageData()_, _putImageData()_
+ __video stream__ from webcam
  + _getUserMedia()_
+ __debugger__ to prevent logs of repeat executions
+ Grabbing pixels off a canvas and modifying RGBA values to create a filter effect
+ Nice model of coordinating and utilising UI _input_ levels with canvas pixels in __greenScreen()__

```json
"scripts": {
  "start": "browser-sync start --server --files \"*.css, *.html, *.js\""
},
"devDependencies": {
  "browser-sync": "^2.12.5"
}
```
+ __Browser sync__ start script!
  + Easy hot reloading. No global install.
  + Load on devices using wifi with external URL

```JavaScript
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'downloadedFileTitleHere');
  link.innerHTML = `<img src="${data}" alt="" />`;
  strip.insertBefore(link, strip.firsChild);
```
+ __Creating an element__ and adding/setting its attributes in JS
  + __insertBefore()__

```JavaScript
red = pixels.data[i + 0];
green = pixels.data[i + 1];
blue = pixels.data[i + 2];
alpha = pixels.data[i + 3];
```
+ Not entirely sure how he gets away with using _red_ etc. here without a const/let declaration...

```JavaScript
video.addEventListener('canplay', paintToCanvas);
```
+ __canplay__ event listener

### 20 - Speech Detection

__See projects files.__ Again, niche but a great demo

__Take aways:__

```JavaScript
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
p.textContent = transcript;
```
+ __Creating an element__ and appending it to existing DOM element in JS
  + __appendChild()__
  + __textContent__

```JavaScript
recognition.addEventListener('result', e => {
  console.log(e.results);
})
```
+ Good place to get a feel for what's returned by the recognition object  

```JavaScript
recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
  .map(result => result[0])
  .map(result =>  result.transcript)
  .join('');
})
```
+ __Chained map() invocations__ somehow feel dirty to me, but this is a nice example of clean, readable data munging
+ _e.results_ has confidence and transcript keys

```JavaScript
if(transcript.includes('London')) {
  console.log('You said London');
}
```
+ Can trigger actions off recognition of words in transcript
+ Love seeing the __multiple interpretations__. Would be interesting to see side by side.

```JavaScript
recognition.addEventListener('end', recognition.start);
```
+ __end__ event
