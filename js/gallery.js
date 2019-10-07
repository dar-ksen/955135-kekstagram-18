'use strict';

var PHOTO_COUNT = 25;

var openPopup = function () {
  upload.classList.remove('hidden');
  window.scale.activeScale();
  document.addEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  window.util.isEscEvent(evt, closePopup);
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

// контроль размеров
uploadOpen.addEventListener('change', function () {
  openPopup();
});

uploadClose.addEventListener('click', function () {
  closePopup();
});

var arrayOfPictures = window.data.getArrayOfPictures(PHOTO_COUNT);
window.gallery.renderAllPictures(arrayOfPictures);
