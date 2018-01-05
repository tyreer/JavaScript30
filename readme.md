# Notes on JavaScript30

Notes as I work through the Wes Bos course.

Grab the course at [https://JavaScript30.com](https://JavaScript30.com)

### 01 - JavaScript Drum Kit
![](./Screens/1DrumKit.png)

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
__document.documentElement.style.setProperty(--${this.name}, this.value + suffix);__

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
+ I'd probably just write ```const category = document.querySelectorAll('.mw-category a');```
+ And use: ```[...category].map()```

const alpha = people.sort((lastOne, nextOne) => {
  __const [aLast, aFirst] = lastOne.split(', ')__;

+ Elegant munging into a two-index array via split

const transportation = data.__reduce__((obj, item) => {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, __{}__);

+ _reduce_ with an empty object as _initialValue_
+ Both adding up instances and constructing a data object

#### Robert solutions

const sortedInventors = inventors.__sort__((inventorA, inventorB) => inventorA.year - inventorB.year);

+ Sort can determine order based on any returned value greater than 0 or less than 0. In this case, simply testing if one year has a higher number than another _would at first seem_ preferable if a bit less transparent than explicitly returning -1 or 1.

+ YET, MDN indicates that not only do browsers have varying algorithms to execute sort, but "If _compareFunction_ is not supplied, elements are sorted by converting them to strings and comparing strings in Unicode code point order...because numbers are converted to strings, "80" comes before "9" in Unicode order."

+ At a minimum then, if I want to avoid the ternary and explicitly returning -1 vs 1, I'd need to pass in a basic _compareFunction_ as below:

var mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];

function compareNumbers(a, b) {
  return a - b;
}

mixedNumericArray.sort(compareNumbers);

+ Bos's solution for (7) sort by last name is still a bit baffling to me. Since all the names start with their last name first and we're comparing strings, can't we simply run the default sort?

const sortedPeople = people.sort();

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
  ?    e.currentTarget.classList.remove('open', 'open-active')
  :  e.currentTarget.classList.add('open', 'open-active')
  }
  ```

+ Initially tried __event.target__ but that only hit the <p> tags that were being clicked, which didn't works
+ Arrow function won't have __this__ so to use Bos solution need named function

### 06 - Type Ahead

+ Endpoint in const allows _fetch()_ to read much cleaner
+ _cities_ gets type definition and const and then has __JSON object translated into array__ via __push() + spread__
+ _fetch()_ promise handling with _then()_    
```JavaScript
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
  .then(data => data.json())
  .then(data =>  cities.push(...data));
  ```
+ __filter()__ on data array
+ __new RegExp(wordToMatch, 'gi')__ useful way to make a regex. _g_ = global (Across entire string). _i_ = insensitive to case
+ __match()__ condition in _filter()_ satisfies its functionality in a bit of weird way. The return only matters if it is interpreted as _true_ or _null_. The actual matched array from the _match()_ call is only used to say, "yes any match exists, so include this object from the _cities_ array in the returned filtered array"
  ```JavaScript
  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi')
      return place.city.match(regex) || place.state.match(regex);
    });
  }
  ```
+ _this.value_ is the input value and _displayMatches()_ is called on _keyup_
+ __map()__ on a data array to generate markup feels similar to React
+ __return a string literal__ of markup is blowing my mind
+ __join('')__ is necessary to translate from the array of _map()_ into one big string of HTML
+ __innerHTML__ used on a _<ul>_ to populate a list
+ __replace()__ used to wrap the matched input from the text box in the highlight span
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
