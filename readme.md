# Notes on JavaScript30

Notes as I work through the Wes Bos course.

Grab the course at [https://JavaScript30.com](https://JavaScript30.com)

### 01 - JavaScript Drum Kit
![](./Screens/1DrumKit.png)

_addEventListener.(’<span style="color:tomato">transitionend</span>’, removeTransition)_
+ On all divs with .key classes, listen for the _transition end_ and do a callback.

<span style="color:tomato">_e.propertyName_</span>

+ All the properties that are transitioning.
Here just choosing the longest one associated with the div the transitions are taking place on.
+ _return_ allow instant ignore bc we only care about the longest one

_document.querySelector(<span style="color:tomato">audio[data-key="${e.keyCode}"]</span>);_
_document.querySelector(<span style="color:tomato">div[data-key=“${e.keyCode}"]</span>);_

+ Allows us to target just the first (here only) element of the type indicated and with the data attribute of the same value as the keyCode firing the event.

_if (!audio) <span style="color:tomato">return</span>;_

+ Instant end if no audio element (a keyboard key without a reason to be considered).

_audio.<span style="color:tomato">currentTime</span> = 0;_

+ Prevents needing to wait until audio element finishes to fire a new _play()_ action.
