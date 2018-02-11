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
