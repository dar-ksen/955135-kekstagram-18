'use strict';

(function () {
  var SCALE_STEP = 25;
  var MIN_SCALE_VALUE = '25%';
  var MAX_SCALE_VALUE = '100%';

  var upload = window.util.upload;
  var scaleControl = upload.querySelector('.scale__control--value');
  var scaleDec = upload.querySelector('.scale__control--smaller');
  var scaleInc = upload.querySelector('.scale__control--bigger');
  var uploadImage = upload.querySelector('.img-upload__preview img');

  var decreaseScaleValue = function () {
    var scaleStep = (scaleControl.value === MIN_SCALE_VALUE) ? 0 : SCALE_STEP;
    scaleControl.value = (parseInt(scaleControl.value, 10) - scaleStep) + '%';
  };

  var increaseScaleValue = function () {
    var scaleStep = (scaleControl.value === MAX_SCALE_VALUE) ? 0 : SCALE_STEP;
    scaleControl.value = (parseInt(scaleControl.value, 10) + scaleStep) + '%';
  };

  var changeScale = function () {
    var currentScale = parseInt(scaleControl.value, 10);
    uploadImage.style.transform = 'scale( ' + (currentScale / 100) + ')';
  };

  var onScaleDecClick = function () {
    decreaseScaleValue();
    changeScale();
  };

  var onScaleIncClick = function () {
    increaseScaleValue();
    changeScale();
  };

  var activeScale = function () {
    scaleControl.value = MAX_SCALE_VALUE;
    changeScale();
  };

  scaleDec.addEventListener('click', onScaleDecClick);
  scaleInc.addEventListener('click', onScaleIncClick);

  window.scale = {
    active: activeScale,
  };
})();
