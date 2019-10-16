'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var pictures = document.querySelector('.pictures');
  var filter = document.querySelector('.img-filters');
  var filterButtons = filter.querySelectorAll('.img-filters__button');

  var arrayOfPictures;

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
        window.preview.viewPhoto(arrayOfPictures[key]);
        return;
      }
      target = target.parentNode;
    }
  });

  filter.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('img-filters__button')) {
      filterButtons.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');
      window.imgFilter.choose(target.id, arrayOfPictures);
    }
  });


})();
