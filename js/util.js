'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var hashtagInput = document.querySelector('.text__hashtags');
  var descriptionInput = document.querySelector('.text__description');

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE && !hashtagInput.matches(':focus') && !descriptionInput.matches(':focus')) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomArrayIndex = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomNumber: getRandomNumber,
    getRandomArrayIndex: getRandomArrayIndex,
  };
})();
