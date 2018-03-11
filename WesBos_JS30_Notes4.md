# JavaScript30
__Lessons 23–26__

### 23 - Speech Synthesis

```JavaScript
const msg = new SpeechSynthesisUtterance();
let voices = [];
...
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
```
Both part of the __Web Speech API__ native in browsers
+ __speechSynthesis__ is
>the controller interface for the speech service; this can be used to retrieve information about the synthesis voices available on the device, start and pause speech, and other commands besides.

+ __SpeechSynthesisUtterance__ represents
>a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.)

__populateVoices()__
+ Quick and easy __filter()__

__setVoice()__
+ Differed to mine in use of __find()__
  + This is more declarative and uses the value attribute on the DOM object to explicitly correlate with the desired setting on the _msg_ object

```JavaScript
const voiceOptions = voices
  .map( (voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`)
  .join('');

function setVoice() {
  msg.voice = voices[this.value];
}
```
+ I connected these by carrying the index through on an option attribute

__toggle()__
+ __default parameter value__ with _toggle(startOver = true)_
  + This allows the _toggle_ function to be used to different effect in _setVoice_ and inline on the _stopButton_ DOM element

```JavaScript
stopButton.addEventListener('click', () => toggle(false));
```
+ __Passing a parameter into a callback__ with an arrow function  

```JavaScript
stopButton.addEventListener('click', toggle.bind(null, false));
```
+ Also possible to pass parameter to a callback with __bind__

### 24 - Sticky Nav

```JavaScript
const nav = document.querySelector('#main');
let topOfNav = nav.offsetTop;

function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

window.addEventListener('scroll', fixNav);
```
+ __offsetTop__ as opposed to my use of _getBoundingClientRect().top_
+ Advantage of __programmatically setting__ _paddingTop_ with __offsetHeight__ is that there's no problem if font size, etc. changes

```JavaScript
document.body.classList.add('fixed-nav');
```
+ __Add page state class to body__. If it's high up, easy to target anything affected

```css
li.logo {
  max-width:0;
  overflow: hidden;
  transition: all 0.5s;
}
.fixed-nav li.logo {
  max-width:500px;
}
```
+ __max-width allows transitions__, but _width: auto_ does not. 500px value is simply something way larger than it would ever be. Flex is handling actual width.

```css
.site-wrap {
  transform: scale(0.98);
  transition: transform 0.5s;
}
body.fixed-nav .site-wrap {
  transform: scale(1);
}
```
+ Nice UX effect to boost main content area via a __subtle scale transform__

### 25 - Event Capture, Propagation, Bubbling

> Event bubbling and capturing are two ways of propagating events which occur in an element that is nested within another element, when both elements have registered a handle for that event. The event propagation mode determines the order in which elements receive the event

```JavaScript
  divs.forEach(div => div.addEventListener('click', logText, {
    capture: true
  }));
```
+ Third argument of _addEventListener_ is the __options object__

__Capture__
+ Event capturing can be thought of as an arrow cutting through layers of DOM and triggering any handles registered for that event on the way to the inner most element
+ __capture__ here says to fire off click events on the initial event capture decent into inner DOM element
+ "On the way down"
+ Event bubbling occurs on the way back up
+ __Default is false__

```JavaScript
e.stopPropagation(); // stop bubbling!
```

+ Won't trigger events on the parents on the way up
 + Or on the way _down_ if _capture_ is set to true

```JavaScript

  button.addEventListener('click', () => {
    console.log('Click!!!');
  }, {
    once: true
  });
  ```

+ __once__ = unbind after the event is fired (like, _removeEventListener_)
+ For instance, in a checkout where the event should only ever fire once

### 26 - Stripe Follow Along Nav

```JavaScript
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
```
+ When entering into a non-arrow function, the value of _this_ changes, so declaring a _function()_ would prevent the use of _this.classList_



```CSS
  .dropdown {
    opacity: 0;
    transition: all 0.5s;
    will-change: opacity;
    display: none;
  }

  .trigger-enter .dropdown {
    display: block;
  }

  .trigger-enter-active .dropdown {
    opacity: 1;
  }
```

```JavaScript
function handleEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
  ...
```
+ Handling a __transition from _display: none___ with ___setTimeout()___
+ __Short-circuiting with &&__ to avoid _if_ syntax

```JavaScript
const dropdown = this.querySelector('.dropdown');
```
+ __querySelector on _this___ to connect elements
  + Much simpler than my passing in and _index_ value

```JavaScript
const dropdownCoords = dropdown.getBoundingClientRect();
const navCoords = nav.getBoundingClientRect();

const coords = {
  height: dropdownCoords.height,
  width: dropdownCoords.width,
  top: dropdownCoords.top - navCoords.top,
  left: dropdownCoords.left - navCoords.left
};
```
+ Logging entire returned object from getBoundingClientRect into a _const_
+ __Setting keys on a newly declared object__
+ _navCoords.top_ and _.left_ useful in programmatically determining top offset and accounting for any variations from extra markup, etc.

```JavaScript
background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
```
+ Using __translate rather than left/top offsets__
