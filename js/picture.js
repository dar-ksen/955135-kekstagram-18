'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPictureAttributs = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    return pictureElement;
  };

  var renderAllPictures = function (arrayPictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayPictures.length; i++) {
      fragment.appendChild(renderPictureAttributs(arrayPictures[i]));
    }
    pictures.appendChild(fragment);
  };

  window.gallery = {
    renderAllPictures: renderAllPictures,
  };
})();
