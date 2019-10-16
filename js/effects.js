'use strict';

(function () {
  var upload = window.util.upload;

  var uploadImage = upload.querySelector('.img-upload__preview img');
  var imageEffects = upload.querySelector('.effects');

  var slider = document.querySelector('.effect-level');
  var sliderLine = slider.querySelector('.effect-level__line');
  var sliderPin = slider.querySelector('.effect-level__pin');
  var sliderLevel = slider.querySelector('.effect-level__depth');
  var sliderValue = slider.querySelector('.effect-level__value');

  sliderPin.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var startCoords = e.clientX;

    var onMouseMove = function (moveE) {
      moveE.preventDefault();

      var shift = startCoords - moveE.clientX;
      var sliderNumber = (sliderPin.offsetLeft / sliderLine.offsetWidth).toFixed(2);
      startCoords = moveE.clientX;

      if (sliderPin.offsetLeft - shift >= 0 && sliderPin.offsetLeft - shift <= sliderLine.offsetWidth) {
        sliderPin.style.left = (sliderPin.offsetLeft - shift) + 'px';
        sliderLevel.style.width = (sliderPin.offsetLeft) + 'px';
      }

      sliderValue.value = sliderNumber * 100;
      changeEffects();

    };

    var onMouseUp = function (upE) {
      upE.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var changeEffects = function () {
    var checkedEffect = imageEffects.querySelector('input:checked');
    var sliderOfset = sliderPin.offsetLeft / sliderPin.parentNode.offsetWidth;

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
        uploadImage.style.filter = 'brightness(' + (1 + sliderOfset * 2) + ')';
        break;
      default:
        uploadImage.style.removeProperty('filter');
        break;
    }
  };

  imageEffects.addEventListener('change', changeEffects);

})();
