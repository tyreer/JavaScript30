# JavaScript30
__Lessons 23–__

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

__speechSynthesis__ is a global variable
__SpeechSynthesisUtterance__

__populateVoices()__
+ Quick and easy __filter()__

__setVoice()__
+ Differed to mine in use of __find()__
  + This is more declarative

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
+ __default parameter value__

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

First is capture: top down
  + Arrow through layers
Then bubble: back up
+ "bubble up"

```JavaScript
  divs.forEach(div => div.addEventListener('click', logText, {
    capture: true
  }));
```
+ Third argument is __options object__
  + __capture__ here says to fire off click events on the initial event capture decent into inner DOM element
  + "On the way down"
  + Default is false

  ```JavaScript
  e.stopPropagation(); // stop bubbling!
  ```
+ Won't trigger events on the parents on the way up
 + Or _down_ if _capture_ is set to true

  ```JavaScript

    button.addEventListener('click', () => {
      console.log('Click!!!');
    }, {
      once: true
    });
    ```
  + __once__ = unbind after the event is fired (like, _removeEventListener_)
  + For instance, in a checkout where the event should only ever fire once
