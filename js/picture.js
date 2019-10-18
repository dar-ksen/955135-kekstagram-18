'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPictureAttributs = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.mark = picture.mark;
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    return pictureElement;
  };

  var renderAllPictures = function (elements) {
    var fragment = document.createDocumentFragment();
    elements.forEach(function (element) {
      fragment.appendChild(renderPictureAttributs(element));
    });
    pictures.appendChild(fragment);
  };


  window.picture = {
    renderAll: renderAllPictures,
  };
})();
