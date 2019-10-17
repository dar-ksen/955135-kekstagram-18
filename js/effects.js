'use strict';

(function () {
  var SLIDER_LEVEL_MAX = '100%';
  var upload = window.util.upload;

  var uploadImage = upload.querySelector('.img-upload__preview img');
  var imageEffects = upload.querySelector('.effects');

  var slider = document.querySelector('.effect-level');
  var sliderLine = slider.querySelector('.effect-level__line');
  var sliderPin = slider.querySelector('.effect-level__pin');
  var sliderLevel = slider.querySelector('.effect-level__depth');
  var sliderValue = slider.querySelector('.effect-level__value');

  var getIntensity = function () {
    return (sliderPin.offsetLeft / sliderLine.offsetWidth).toFixed(2);
  };

  var getSaturation = function (intensity) {
    var effects = {
      chrome: {
        class: 'effects__preview--chrom',
        filter: 'grayscale(' + intensity + ')',
      },
      sepia: {
        class: 'effects__preview--sepia',
        filter: 'sepia(' + intensity + ')',
      },
      marvin: {
        class: 'effects__preview--marvin',
        filter: 'invert(' + intensity * 100 + '%)',
      },
      phobos: {
        class: 'effects__preview--phobos',
        filter: 'blur(' + intensity * 3 + 'px)',
      },
      heat: {
        class: 'effects__preview--heat',
        filter: 'brightness(' + (1 + intensity * 2) + ')',
      },
      none: {
        class: '',
        filter: '',
      },
    };
    return effects;
  };

  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;

      if (sliderPin.offsetLeft - shift >= 0 && sliderPin.offsetLeft - shift <= sliderLine.offsetWidth) {
        sliderPin.style.left = (sliderPin.offsetLeft - shift) + 'px';
        sliderLevel.style.width = (sliderPin.offsetLeft) + 'px';
      }

      changeEffects(getIntensity());

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var changeEffects = function (intensive) {
    var checkedEffect = imageEffects.querySelector('input:checked');
    sliderValue.value = intensive * 100;

    var saturation = getSaturation(intensive)[checkedEffect.value];
    uploadImage.style.filter = saturation.filter;
    uploadImage.setAttribute('class', saturation.class);
  };

  var switchEffect = function () {
    sliderPin.style.left = SLIDER_LEVEL_MAX;
    sliderLevel.style.width = SLIDER_LEVEL_MAX;

    if (imageEffects.querySelector('#effect-none').checked) {
      slider.style.visibility = 'hidden';
    } else {
      slider.style.visibility = 'visible';
    }

    changeEffects(getIntensity());
  };

  imageEffects.addEventListener('change', switchEffect);

  window.effects = {
    switch: switchEffect
  };

})();
