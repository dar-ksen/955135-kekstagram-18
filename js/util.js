'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var body = document.querySelector('body');
  var pictures = document.querySelector('.pictures');

  var upload = document.querySelector('.img-upload__overlay');

  var isEscEvent = function (evt, action, isNotAllowed) {
    if (evt.keyCode === ESC_KEYCODE && !isNotAllowed) {
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

  var cleanContainer = function (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  var deletePictures = function () {
    [].forEach.call(pictures.querySelectorAll('.picture'), function (picture) {
      picture.parentNode.removeChild(picture);
    });
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomNumber: getRandomNumber,
    getRandomArrayIndex: getRandomArrayIndex,
    cleanContainer: cleanContainer,
    deletePictures: deletePictures,
    upload: upload,
    body: body,
  };
})();
