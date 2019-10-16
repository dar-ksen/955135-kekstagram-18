'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var pictures = document.querySelector('.pictures');
  var filter = document.querySelector('.img-filters');
  var filterButtons = filter.querySelectorAll('.img-filters__button');

  var arrayOfPictures;

  var hashtagInput = document.querySelector('.text__hashtags');
  var descriptionInput = document.querySelector('.text__description');

  var openPopup = function () {
    upload.classList.remove('hidden');
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

  var upload = window.util.upload;
  var uploadOpen = document.querySelector('#upload-file');
  var uploadClose = upload.querySelector('#upload-cancel');
  var form = document.querySelector('.img-upload__form');

  uploadOpen.addEventListener('change', function () {
    openPopup();
  });

  uploadClose.addEventListener('click', function () {
    closePopup();
  });


  var onLoad = function (data) {
    arrayOfPictures = data;
    arrayOfPictures.forEach(function (picture, index) {
      picture.mark = index;
    });
    window.picture.renderAll(arrayOfPictures);
    filter.classList.remove('img-filters--inactive');
  };

  var onError = function (errorMessage) {
    window.message.show(errorMessage);
  };

  window.backend.ajax(onLoad, onError, 'GET', URL_LOAD);

  pictures.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== pictures) {
      if (target.classList.contains('picture')) {
        evt.preventDefault();
        var key = target.dataset.mark;
        window.previews.viewPhoto(arrayOfPictures[key]);
        return;
      }
      target = target.parentNode;
    }
  });

  filter.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('img-filters__button') && !target.classList.contains('img-filters__button--active')) {
      window.imgFilter.filters[target.id](arrayOfPictures);
      filterButtons.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');
    }
  });


})();
