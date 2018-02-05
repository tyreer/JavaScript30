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
