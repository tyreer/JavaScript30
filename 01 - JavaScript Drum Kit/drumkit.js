"use strict"

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function addClass(e) {
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!key) return;
  key.classList.add('playing');
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
window.addEventListener('keydown', addClass);


// INITIAL SOLUTION
// -----------------------------

// let drumKeys = Array.from(document.getElementsByClassName('key'));
// let drumSounds = Array.from(document.getElementsByTagName('audio'));
//
// let dataAttributes = Array.from(document.querySelectorAll('[data-key]'));
// let timeoutID;
//
// document.addEventListener("keydown", handleKeyDown);
//
// function addClasses(element) {
//   element.classList.add('playing');
// }
// function removeClasses() {
//   document.getElementsByClassName('playing')[0].classList.remove('playing')
// }
//
// function handleKeyDown(event) {
//
//   dataAttributes.forEach(element => {
//     if (element.classList.contains('key')) {
//       if (event.keyCode == element.dataset.key) {
//         addClasses(element);
//         timeoutID = window.setTimeout(removeClasses, 100);
//       }
//     } else {
//       if (event.keyCode == element.dataset.key) {
//         element.play();
//       }
//     }
//   });
// }

// END INITIAL SOLUTION
// -----------------------------


// ARCHIVE
// -----------------------------

// dataAttributes.forEach(element => {
//   console.log(element.dataset.key)
// });

// console.log(dataAttributes);

// let combinedElements = drumKeys.map(element => console.log(element));

// drumKeys.forEach(function(key){
//   console.log(key);
//   key.addEventListener("keydown", handleKeyDown)
// })
