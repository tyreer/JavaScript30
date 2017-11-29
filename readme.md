# Notes on JavaScript30

Notes as I work through the Wes Bos course.

Grab the course at [https://JavaScript30.com](https://JavaScript30.com)

### 01 - JavaScript Drum Kit
![](./Screens/1DrumKit.png)

_addEventListener.(’__transitionend__’, removeTransition)_
+ On all divs with .key classes, listen for the _transition end_ and do a callback.

___e.propertyName___

+ All the properties that are transitioning.
Here just choosing the longest one associated with the div the transitions are taking place on.
+ _return_ allow instant ignore bc we only care about the longest one

_document.querySelector(__audio[data-key="${e.keyCode}"]__);_
_document.querySelector(__div[data-key=“${e.keyCode}"]__);_

+ Allows us to target just the first (here only) element of the type indicated and with the data attribute of the same value as the keyCode firing the event.

_if (!audio) __return__;_

+ Instant end if no audio element (a keyboard key without a reason to be considered).

_audio.__currentTime__ = 0;_

+ Prevents needing to wait until audio element finishes to fire a new _play()_ action.

#### Robert's solution
+ Breaks out the sound and styling operations into two distinct functions

### 02 - JS and CSS Clock
![](./Screens/2Clock.png)


__const secondsDegrees = ((seconds / 60) * 360) + 90;__

+ Easy to logically follow at a glance

__setInterval__(setDate, 1000);

+ No need to add _window._ before hand

#### Robert's solution
+ Calls the minute and hour setters only when necessary rather than every second


### 03 - CSS Variables
(1)
![](./Screens/3CSSVar_1.png)
(2)
![](./Screens/3CSSVar_2.png)


__:root {
  --base: #ffc600;
  --spacing: 10px;
  --blur: 10px;
  }__

+ Declare CSS variables on _:root_

__filter: blur(var(--blur))__;

+ Filter style attribute on _img_ elements

inputs.forEach(input => input.addEventListener(__'mousemove'__, handleUpdate));

+ Even though the _inputs_ object is still a NodeList and not a proper array, can call _forEach_ on it
+ _mousemove_ event triggers anytime mouse hovers over element. Used here to handle dragging the sliders and updating the UI

__const suffix = this.dataset.sizing || '';__
__document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);__

+ Reaching into document to set the variable with the changed input's value

#### Robert Notes
+ _mousemove_ seems to be calling JS to set the property unnecessarily. The variable value and thus UI is still only being updated once the value changes, but might be preferable to only trigger handleUpdate if mouse/touch down event is active.
