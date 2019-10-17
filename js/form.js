'use strict';

(function () {
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var upload = window.util.upload;
  var body = window.util.body;

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
    body.classList.add('modal-open');
  };

  var closePopup = function () {
    upload.classList.add('hidden');
    body.classList.remove('modal-open');
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
    hashtagInput.reportValidity();
    hashtagInput.style.outline = !hashtagInput.validity.valid ? '2px solid red' : 'none';
  });

  var validateHashtags = function (userInput) {
    var message = '';
    if (userInput !== '') {
      var arrayHashtags = userInput.toLowerCase().split(' ');

      if (arrayHashtags.length > 5) {
        message = 'Вы не можете использовать больше 5 хэштегов';
      } else {
        arrayHashtags.forEach(function (hashtag, index) {
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
          if (arrayHashtags.indexOf(hashtag) !== index) {
            message = 'Вы уже использовали данный хэштег';
          }
          if (hashtag.length > 20) {
            message = 'Длина хэштега должна быть не больше 20 символов, включая решётку';
          }
        });
      }
    }
    return message;
  };

  var onSend = function () {
    closePopup();
    window.message.show();
  };
  var onError = function (errorMessage) {
    closePopup();
    window.message.show(errorMessage);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.ajax(onSend, onError, 'POST', URL_SAVE, new FormData(form));
  });

})();
