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

  var renderAllPictures = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPictureAttributs(data[i], i));
    }
    pictures.appendChild(fragment);
  };


  window.picture = {
    renderAll: renderAllPictures,
  };
})();
