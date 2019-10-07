'use strict';

(function () {
  var upload = window.util.upload;

  var pinSlider = document.querySelector('.effect-level__pin');
  var uploadImage = upload.querySelector('.img-upload__preview img');
  var imageEffects = upload.querySelector('.effects');

  var hashtagInput = document.querySelector('.text__hashtags');

  // валидация
  hashtagInput.addEventListener('input', function () {
    var hashtagError = validateHashtags(hashtagInput.value);
    hashtagInput.setCustomValidity(hashtagError);
  });

  var validateHashtags = function (userInput) {
    var message = '';
    if (userInput !== '') {
      var arrayHashtags = userInput.toLowerCase().split(' ');

      if (arrayHashtags.length > 5) {
        message = 'Вы не можете использовать больше 5 хэштегов';
      } else {
        for (var i = 0; i < arrayHashtags.length; i++) {
          var hashtag = arrayHashtags[i];

          if (hashtag[0] !== '#') {
            message = 'Вы забыли поставить знак #';
          }

          if (hashtag === '#') {
            message = 'Вы не ввели текст хэштэга';
          }

          var cutHashtag = hashtag.slice(1);

          if (cutHashtag.indexOf('#') !== -1) {
            message = 'Вы забыли поставить пробел между хэштегами';
          }

          if (arrayHashtags.indexOf(hashtag) !== i) {
            message = 'Вы уже использовали данный хэштег';
          }

          if (hashtag.length > 20) {
            message = 'Длина хэштега должна быть не больше 20 символов, включая решётку';
          }
        }
      }

    }

    return message;
  };

  // выбор эффекта

  var changeEffects = function () {
    var checkedEffect = imageEffects.querySelector('input:checked');
    var sliderOfset = pinSlider.offsetLeft / pinSlider.parentNode.offsetWidth;

    switch (checkedEffect.value) {
      case 'chrome':
        uploadImage.style.filter = 'grayscale(' + sliderOfset + ')';
        break;
      case 'sepia':
        uploadImage.style.filter = 'sepia(' + sliderOfset + ')';
        break;
      case 'marvin':
        uploadImage.style.filter = 'invert(' + sliderOfset * 100 + '%)';
        break;
      case 'phobos':
        uploadImage.style.filter = 'blur(' + sliderOfset * 3 + 'px)';
        break;
      case 'heat':
        uploadImage.style.filter = 'brightness(' + sliderOfset * 3 + ')';
        break;
      default:
        uploadImage.style.removeProperty('filter');
        break;
    }
  };

  imageEffects.addEventListener('change', changeEffects);
})();
