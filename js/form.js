'use strict';

(function () {
  var upload = window.util.upload;

  var hashtagInput = document.querySelector('.text__hashtags');
  var descriptionInput = document.querySelector('.text__description');
  var uploadOpen = document.querySelector('#upload-file');
  var uploadClose = upload.querySelector('#upload-cancel');
  var form = document.querySelector('.img-upload__form');

  var openPopup = function () {
    upload.classList.remove('hidden');
    window.effects.switch();
    window.scale.activeScale();
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    var isNotAllowed = [hashtagInput, descriptionInput].includes(document.activeElement);
    window.util.isEscEvent(evt, closePopup, isNotAllowed);
  };

  var closePopup = function () {
    upload.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    form.reset();
  };

  uploadOpen.addEventListener('change', function () {
    openPopup();
  });

  uploadClose.addEventListener('click', function () {
    closePopup();
  });

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

})();
