# Notes on JavaScript30

Notes as I work through the Wes Bos course.

Grab the course at [https://JavaScript30.com](https://JavaScript30.com)

### 01 - JavaScript Drum Kit
```JavaScript
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
```

_addEventListener.(’__transitionend__’, removeTransition)_
+ On all divs with .key classes, listen for the _transition end_ and do a callback.

```JavaScript
e.propertyName
```

+ All the properties that are transitioning.
Here just choosing the longest one associated with the div the transitions are taking place on.
+ _return_ allow instant ignore bc we only care about the longest one

_document.querySelector(__audio[data-key="${e.keyCode}"]__);_

_document.querySelector(__div[data-key=“${e.keyCode}"]__);_

+ Allows us to target just the first (here only) element of the type indicated and with the data attribute of the same value as the keyCode firing the event.
+ Visible UI element and desired audio file __associated with shared data attribute (data-key)__

_if (!audio) __return__;_

+ Instant end if no audio element (a keyboard key without a reason to be considered).

```JavaScript
if(condition) return;
```
+ Super terse w/o brackets or newline

_audio.__currentTime__ = 0;_

+ Prevents needing to wait until audio element finishes to fire a new _play()_ action.

```JavaScript
<kbd>A</kbd>
```
> __kbd__: The HTML Keyboard Input element represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device.

#### Robert's solution
+ Breaks out the sound and styling operations into two distinct functions

### 02 - JS and CSS Clock

```JavaScript
function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();
```

__const secondsDegrees = ((seconds / 60) * 360) + 90;__

+ Easy to logically follow at a glance

__setInterval__(setDate, 1000);

+ No need to add _window._ before hand

#### Robert's solution
+ Calls the minute and hour setters only when necessary rather than every second


### 03 - CSS Variables
```HTML
<div class="controls">
  <label for="spacing">Spacing:</label>
  <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">

  <label for="blur">Blur:</label>
  <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px">

  <label for="base">Base Color</label>
  <input id="base" type="color" name="base" value="#ffc600">
</div>

<img src="https://source.unsplash.com/7bwQXzbF6KE/800x500">

<style>
  :root {
    --base: #ffc600;
    --spacing: 10px;
    --blur: 10px;
  }

  img {
    padding: var(--spacing);
    background: var(--base);
    filter: blur(var(--blur));
  }

  .hl {
    color: var(--base);
  }
```

```JavaScript
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

+ Declare CSS variables on __:root__

+ __filter: blur(var(--blur))__;

+ Filter style attribute on _img_ elements

+ UI element and desired variable __associated with shared name attribute (`--${this.name}`)__

inputs.forEach(input => input.addEventListener(__'mousemove'__, handleUpdate));

+ Even though the _inputs_ object is still a NodeList and not a proper array, can call _forEach_ on it
+ _mousemove_ event triggers anytime mouse hovers over element. Used here to handle dragging the sliders and updating the UI

```JavaScript
const suffix = this.dataset.sizing || '';
document.documentElement.style.setProperty(--${this.name}, this.value + suffix);
```

+ Reaching into document to set the variable with the changed input's value

#### Robert notes
+ _mousemove_ seems to be calling JS to set the property unnecessarily. The variable value and thus UI is still only being updated once the value changes, but might be preferable to only trigger handleUpdate if mouse/touch down event is active.

### 04 - Array Cardio Day 1

const birthdateInventors = inventors.__filter__(inventor => (inventor.year >= 1500 && inventor.year < 1600));

+ Pass filter() a function with a test to implement on all items in an array. Returns new array with passing elements.

const fullNameInventors = inventors.__map__(inventor => `${inventor.first} ${inventor.last}`)

+ Pass map() a function and it will return a new array with the function executed on each element of the original array

const ordered = inventors.__sort__((a, b) => a.year > b.year ? 1 : -1);

+ Compares two items in an array and explicitly says a larger year should be sorted at a later index (returns greater than 0, or 1)

const totalYears = inventors.__reduce__((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}__, 0__);

+ The second _initialValue_ parameter is key for a reliable reduce

const category = document.querySelector('.mw-category');

const links = Array.from(__category.querySelectorAll('a')__);

const de = links
.map(link => __link.textContent__)
.filter(streetName => __streetName.includes('de')__);

+ Nice demo of targeting via the console.
+ _querySelectorAll_ is getting called to further filter through the category results
+ I'd probably just write
```JavaScript
const category = document.querySelectorAll('.mw-category a');
```
+ And use:
```JavaScript
[...category].map()
```

```JavaScript
const people = ['Beck, Glenn', 'Becker, Carl']
const alpha = people.sort((lastOne, nextOne) => {
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
});
```
+ Elegant munging into a two-index array via split

```JavaScript
const transportation = data.reduce((obj, item) => {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});
```

+ _reduce_ with an empty object as _initialValue_
+ Both adding up instances and constructing a data object

#### Robert solutions

const sortedInventors = inventors.__sort__((inventorA, inventorB) => inventorA.year - inventorB.year);

+ Sort can determine order based on any returned value greater than 0 or less than 0. In this case, simply testing if one year has a higher number than another _would at first seem_ preferable if a bit less transparent than explicitly returning -1 or 1.

+ YET, MDN indicates that not only do browsers have varying algorithms to execute sort, but...
>"If _compareFunction_ is not supplied, elements are sorted by converting them to strings and comparing strings in Unicode code point order...because numbers are converted to strings, "80" comes before "9" in Unicode order."

+ At a minimum then, if I want to avoid the ternary and explicitly returning -1 vs 1, I'd need to pass in a basic _compareFunction_ as below:

```JavaScript
var mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];
function compareNumbers(a, b) {
  return parseInt(a) - parseInt(b);
}
mixedNumericArray.sort(compareNumbers);
```

+ Bos's solution for (7) sort by last name is still a bit baffling to me. Since all the names start with their last name first and we're comparing strings, can't we simply run the default sort?

```JavaScript
const sortedPeople = people.sort();
```

### 05 - Flex Panel Gallery

+ Nesting flex containers is maybe not as dirty as it feels? Display flex on both outer and inner divs.

+ One value of number type = flex-grow
```css
flex: 1;
```
+ Might be desirable to use auto which means both
```css
flex: auto;
flex: 1 1 auto;
```
+ Or just explicitly say
```css
flex-grow: 1;
```
+ flex: _grow, shrink, basis_

+ Five times other flex items with _flex: 1_
```css
.panel.open {
  flex: 5;
  font-size:40px;
}
```
+ Universal selector allows general first-child in a context
```css
.panel > *:first-child {
  transform: translateY(-100%);
}
```
+ Transform to start an animation off screen (_still problematic for screen readers though_)

+ __Toggle()__ is pretty widely supported, but only accepts one value at a time
```JavaScript
function toggleClass() {
  this.classList.toggle('open')
  this.classList.toggle('open-active')
}
```

#### Robert solutions

+ This works because __event.currentTarget__:

> always refers to the element to which the event handler has been attached, as opposed to event.target which identifies the element on which the event occurred.

```JavaScript
const toggleClass = (e) => {
  e.currentTarget.classList.contains('open')
  ?  e.currentTarget.classList.remove('open', 'open-active')
  :  e.currentTarget.classList.add('open', 'open-active')
  }
  ```

+ Initially tried __event.target__ but that only hit the <p> tags that were being clicked, which didn't works
+ Arrow function won't allow use of __this__, so to use Bos solution need a _named_ function

### 06 - Type Ahead

```JavaScript
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
  .then(data => data.json())
  .then(data =>  cities.push(...data));
  ```
+ Endpoint in const allows _fetch()_ to read much cleaner
+ _cities_ gets type definition and const and then has __JSON object translated into array__ via __push() + spread__
  + Spread syntax here is the key to getting a useful array from a JSON object
+ _fetch()_ promise handling with _then()_    

```JavaScript
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi')
    return place.city.match(regex) || place.state.match(regex);
  });
}
```
+ __filter()__ on data array
+ __new RegExp(wordToMatch, 'gi')__ useful way to make a regex. _g_ = global (Across entire string). _i_ = insensitive to case
+ __match()__ condition in _filter()_ satisfies its functionality in a bit of weird way. The return only matters if it is interpreted as _true_ or _null_. The actual matched array from the _match()_ call is only used to say, "yes any match exists, so include this object from the _cities_ array in the returned filtered array"

```JavaScript
function displayMatches() {
  const matchArray = findMatches(this.value, cities)
  const html = matchArray.map(match => {
    const regex = new RegExp(this.value, 'gi');
    const cityMatch = match.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateMatch = match.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
    <li>
      <span class="name">${cityMatch}, ${stateMatch}</span>
      <span class="population">${match.population}</span>
    </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
  ```
+ _this.value_ is the input value and _displayMatches()_ is called on _keyup_
+ __map()__ on a data array to generate markup feels similar to React
+ __return a string literal__ of markup is blowing my mind
+ __join('')__ is necessary to translate from the array of _map()_ into one big string of HTML
+ __innerHTML__ used on a _ul_ to populate a list
+ __replace()__ used to wrap the matched input from the text box in the highlight span

### 07 - Array Cardio 💪💪 Day 2
```JavaScript
const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  ... ]
```

```JavaScript
const hasAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);
const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
```
+ __some()__ checks each element in array and returns boolean if condition is _ever_ true in set
+ __every()__ checks each element in array and returns boolean if condition is _always_ true in set
+ Both array methods have thorough browser support
+ __new Date().getFullYear()__ gives current year

```JavaScript
const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  ... ]
  ```
```JavaScript
const comment = comments.find(comment => comment.id === 823423);
const index = comments.findIndex(comment => comment.id === 823423);
```
+ __find()__ returns value of _first_ element in an array where a condition is true. In this case, the element is the two-attribute object.
+ __findIndex()__ returns the index of the _first_ element to satisfy a condition
+ No IE support currently on these two, but full support otherwise and polyfill on MDN.

```JavaScript
const newComments = [
  ...comments.slice(0, index),
  ...comments.slice(index + 1)
];
```
+ __Remove an element__ from an array using __slice()__
+ One parameter = begin at this index and go to end of array
+ Two parameters =  return a shallow copy of the portion of the array from index of first value to the second (non-inclusive)
+ __Pure function__ so original array isn't changed and it __always returns the same results given the same arguments__.
+ Useful in Redux
+ In contrast, _splice()_ mutates the original array, which is bad

### 08 - HTML5 Canvas
```JavaScript
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```
+ Probably more reliable than 100vh x 100vw

```JavaScript
function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ...
  [lastX, lastY] = [e.offsetX, e.offsetY];
```

+ __if (condition) return__ = nice pattern to use with isHavingState _flag_ to ensure function stops if desired
+ __hsl()__ color option allows rainbows since the hue can endlessly roll on through ROYGBIV
+ Setting multiple values via array destructuring

```JavaScript
if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
  direction = !direction;
}
```
+ Interesting way to toggle a flag

```JavaScript
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
```

+ Coordinating _isDrawing_ flag at beginning of _draw_ with _mousedown_ and _mouseup/mouseout_ to make draw on __drag__ only.

### 09 - Dev Tools Domination

+ In _Elements_ panel of dev tools: __Break on... attribute modification__ to step through JS that changes any attributes

```JavaScript
console.assert(p.classList.contains('ouch'), 'This element does not have ouch!');
```
+ __console.assert()__ Assertion testing will flag if failing but remain silent if condition is met.

```JavaScript
console.dir(p);
```
+ __console.dir()__ allows dom element to be inspected for methods and attributes

```JavaScript
dogs.forEach(dog => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});
```
+ __console.group()__ useful in ordering large outputs that iterate over data

```JavaScript
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
  .then(data => data.json())
  .then(data => {
    console.timeEnd('fetching data');
    console.log(data);
  });
```
+ __console.time()__ gives execution time

### 10 - Hold Shift ⬇️ to Check Multiple Checkboxes

+ Not sure I follow what the fragility liability is in my solution
+ Bos solution is an insightful use of flags to switch behaviour within a forEach() loop.

```JavaScript
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
```
+ This is much more specific than what I used, which was simply _'input'_. Ensures desired selector scope.

```JavaScript
if (e.shiftKey && this.checked) {
  ```
+ __clickEvent.shiftKey__ avoids the need for keydown event listener on window

> The MouseEvent.shiftKey read-only property indicates if the shift key was pressed (true) or not (false) when the event occurred.

+ __this.checked__ = only execute if this checkbox is being checked at time of click

```JavaScript
checkboxes.forEach(checkbox => {
  if (checkbox === this || checkbox === lastChecked) {
    inBetween = !inBetween;
  }
  if (inBetween) {
    checkbox.checked = true;
  }
});
```
+ First _if_ condition allows either checked box to trigger toggle to true and the box further along the index to toggle to false.
+ __A toggle and a conditional execution__ both inside a _forEach()_ loop

### 11 - Custom Video Player

```HTML
<button data-skip="-10" class="player__button">« 10s</button>
<button data-skip="25" class="player__button">25s »</button>
```
```JavaScript
const skipButtons = player.querySelectorAll('[data-skip]');
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(button => button.addEventListener('click', skip));
```
+ Using __data attributes__ to query select DOM elements
+ Using __this.dataset__ to specify outcome—as in, it doesn't matter if this is the fast forward or rewind button, all that matters is the value in the data attribute _skip_
+ My instinct was to use parseInt(), but really __parseFloat()__ is a more sensible default since it will preserve decibels

```HTML
<input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
```
```JavaScript
const ranges = player.querySelectorAll('.player__slider');
function handleRangeUpdate() {
  video[this.name] = this.value;
}
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
```
+ __Bracket notation__ allows the clicked DOM element to provide the property to update on the target _video_ element.
+ For this to work, the __name attribute__ of the input elements needs to correspond with a property that exists on the target video element.
+ Why is _time_ a "property" rather than an "attribute" in both _video[time]_ +  _video.time_?

```JavaScript
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
```
+ __Setting _const_ with ternary__
+ __Bracket notation__ again used to determine which method to call on _video_

```JavaScript
const togglePlay = () => {
  video.paused
  ? video.play()
  : video.pause();
}
```
+ This was my solution

```JavaScript
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}
```
+ __textContent__ used to set the content of the button

```JavaScript
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate', handleProgress);
```
+ __timeupdate__ fires every time the video progresses
+ __Setting style via dot notation__

```JavaScript
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```
+ __mouseEvent.offsetX__ gives the mouse position within the target node
+ Not knowing about that, I manually calculated using __this.getBoundingClientRect().x__, which is also worth knowing about
+ __progress.offsetWidth__ gives the width of the DOM element
+ Callbacks harness a _mousedown_ __flag and shortcircuiting__
