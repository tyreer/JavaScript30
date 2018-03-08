# JavaScript30
__Lessons 12–16__

### 12 - Key Sequence Detection

```js
const userKeySequence = [];
const code = 'win'

window.addEventListener('keyup', e => {
  userKeySequence.push(e.key)

  const userCode = [
    ...userKeySequence.slice(-code.length)
  ].join('');

  if (userCode.includes(code)) {
    console.log('boo yah');
  }
})
```

__My solution__
```JavaScript
const userKeySequence = [];
const code = 'win'

window.addEventListener('keyup', e => {
  userKeySequence.push(e.key)

  const userCode = [
    ...userKeySequence.slice(-code.length)
  ].join('');

  if (userCode.includes(code)) {
    console.log('boo yah');
  }
})
  ```
Bos uses __splice__ in an interesting way.

```JavaScript
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  ```
  + First parameter is starting index, second parameter is how many elements to remove
  + A negative first parameter will start at the end of an array an move backward
    + _-secretCode.length - 1_ could just be replaced by _0_ because the _pressed_ array is never allowed to get longer than the code
    + _pressed.length - secretCode.length_ will evaluate to a negative number and have no effect until _pressed_ is 1 longer than _secretCode_, which will trigger the removal of the value at index 0

I find my solution easier to reason about and I understand that __slice__ not mutating the exiting array hedges against potential bugs.

### 13 -  Slide in on Scroll
__My solution__
```JavaScript
const imgs = document.querySelectorAll('.slide-in');

const checkScroll = () => {
    imgs.forEach(img => {
      const isOnScreen = (window.scrollY + window.innerHeight) > (img.offsetTop - (img.height/2));
      const isActive = img.classList.contains('.active');

      if (isOnScreen && !isActive) {
        img.classList.add('active')
      }
    })
  }

window.addEventListener('scroll', debounce(checkScroll))
```
+ I chose not to implement a reappear on scroll up
+ I can see a benefit to breaking out the _const_ declarations into even smaller bits in terms of readability

__Bos solution__
```JavaScript
function checkSlide() {
  sliderImages.forEach(sliderImage => {
    // half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    // bottom of the image
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
```
+ __debounce__ allows control over how frequently an event fires
  + Elevator pausing to allow more people on is good analogy from here https://css-tricks.com/debouncing-throttling-explained-examples/
+ __(window.scrollY + window.innerHeight)__ = scroll position at bottom of window
+ Not bothered by calling add/remove more than once. Is this a performance consideration or a concern I'm just making up?

__CSS__
```css
.slide-in {
  opacity:0;
  transition:all .5s;
}
.align-left.slide-in {
  transform:translateX(-30%) scale(0.95);
}
.align-right.slide-in {
  transform:translateX(30%) scale(0.95);
}
.slide-in.active {
  opacity:1;
  transform:translateX(0%) scale(1);
}
```
### 14 - JS Reference VS Copy
```JavaScript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;
team[3] = 'Lux';
console.log(players) // -> ['Wes', 'Sarah', 'Ryan', 'Lux'];
```
+ Because _team_ is a __reference__ rather than a _copy_, it mutates the original _players_ array!

__Array copying techniques__
```JavaScript
const team2 = players.slice();
const team3 = [].concat(players);
const team4 = [...players];
const team5 = Array.from(players);
```
+ __spread__ and __Array.from__ seem like goto solutions

```JavaScript
const person = {
  name: 'Wes Bos',
  age: 80
};
const captain = person;
captain.age = 99;
console.log(person) // -> {name: "Wes Bos", age: 99}
```
+ Again _captain_ is a __reference__, so it mutates the original _person_ object

__Object copy techniques__
```JavaScript
const cap2 = Object.assign({}, person, { number: 99, age: 12 });
const cap3 = {...person};
```
+ Pretty sure __object spread__ will make it into JS, but still not 100% confirmed

+ Array and Object copy methods above are all only 1 level deep
+ _lodash_ has __cloneDeep__ method

```JavaScript
const dev2 = JSON.parse(JSON.stringify(wes));
```
+ "Poor man's cloneDeep" converts object to a string then immediately parses it back into an object
+ Questionable performance

### 15 - Local Storage + Event Delegation

+ __DevTools: Preserve Log__ to prevent page refresh from deleting console logs

```JavaScript
function handleAdd(e) {
  e.preventDefault();
  const input = this.querySelector('input[type="text"]');
  ```
  + Helpful to narrow down search to the form we're interacting with. If there were several forms on the page, _this_ allows us to ignore the ones we don't care about
    + Here, an arrow function would eliminate access to the utility of _this_

  + __DevTools -> Application -> LocalStorage__
    + Can also delete localStorage to reset

```JavaScript
function populateList(incomingItems = [], targetList) {
```
  + Default value for argument prevents JS breaking if we forget to pass in an array.

```JavaScript
const listHTML = incomingItems.map((item, index) => {
  return `
    <li>
      <input type="checkbox" id="item${index}" data-index=${index}
      ${item.done ? 'checked' : ''}>
      <label for="item${index}">${item.inputText}</label>
    </li>
  `;
}).join('')
```
+ Ternary to set checked attribute
  + Used ng-if in AngularJS for this, but interpolation within template literals allows native JS to pull off similar functionality.

```JavaScript
localStorage.setItem('items', JSON.stringify(items))
```
+ localStorage can only store strings, so need to run __JSON.stringify()__ to convert objects
+ Will need to tun __JSON.parse()__ when retrieving from localStorage

```JavaScript
const items = JSON.parse(localStorage.items) || [];
```
+ Sets items using localStorage in the initial declaration on page load
  + He uses _JSON.parse(localStorage.__getItem('items')__)_, but I'm not sure why that's beneficial

__Event delegation__

+ Problem to solve is that listening for click or change events won't work on these _li_ elements because they might not exist in the DOM at run time
  + One option for dealing with this is to attach an event listener to a parent element (here the _ul_ itemsList) that you know will be there, and then determine which children objects to modify from that parent context

+ Can think of as very responsible parents, but negligent children who aren't bothered by events on them
  + Tell the parent to pass on the event to its child
  + Parent, you're the only one that is responsible here
  + The event is on something higher, so we need to manage what within that parent we actually want to affect

```JavaScript
  function handleToggle(e) {
    if(!e.target.matches('input')) return;
    const clickedIndex = e.target.dataset.index;
    items[clickedIndex].done = !items[clickedIndex].done;
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList);
  }
  itemsList.addEventListener('click', handleToggle);
  ```

```JavaScript
if(!e.target.matches('input')) return;
```
+ Here, we're saying if the clicked item is not an _input_ (as in, if it's an _li_ or _label_), then __just stop the function and return__
+ __matches()__ is a new API

+ Feels like a basic version of React _setState_ without the diff
+ Feels a bit cumbersome to have to set localStorage with the updated data (_setItem()_) and then rerender the DOM (_populateList()_). Native checkbox input can handle the clicked state without the rerender. But on principle I can understand wanting the localStorage data object to match the rendered DOM elements

### 16 - Mouse Move Shadow

```JavaScript
<script>
  const hero = document.querySelector('.hero');
  const headerText = hero.querySelector('h1');
  const magnitude = 50;

  function animateShadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;

    if (this !== e.target) {
      x = x + e.target.offsetLeft;
      y = y + e.target.offsetTop;
    }

    const xThrow = Math.round((x / width * magnitude) - (magnitude / 2));
    const yThrow = Math.round((y / height * magnitude) - (magnitude / 2));

    headerText.style.textShadow = `
      ${xThrow*-1}px ${yThrow*-1}px 0 rgba(255,0,255,0.7)
    `;

  }

  hero.addEventListener('mousemove', animateShadow);
</script>
```

+ __Destructuring attributes off an element__: _const { offsetWidth: width, offsetHeight: height } = hero;_
+ __offsetX__ and __offsetY__ will return position within target DOM node, so the values reset when hovering over the _H1_
  + _(this !== e.target)_ means if the element triggering the event (_this_) does not equal the mouse event target, then add the coordinates that offset the child element to the total x + y value to maintain a coherent coordinate system.
+ __Math.round()__
