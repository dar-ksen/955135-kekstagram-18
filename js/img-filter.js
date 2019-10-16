'use strict';

(function () {
  var compareRandom = function () {
    return Math.random() - 0.5;
  };


  var filterDiscussed = function (array) {
    window.util.deletePictures();

    window.picture.renderAll(array.slice().sort(function (left, right) {
      var popularDiff = right.comments.length - left.comments.length;
      return popularDiff;
    }));
  };

  var filterRandom = function (array) {
    window.util.deletePictures();
    window.picture.renderAll(array.slice().sort(compareRandom).slice(0, 10));
  };

  var filterPopular = function (array) {
    window.util.deletePictures();
    window.picture.renderAll(array);
  };


  var filters = {
    'filter-popular': filterPopular,
    'filter-random': filterRandom,
    'filter-discussed': filterDiscussed,
  };

  var chooseFilter = window.debounce(function (key, array) {
    filters[key](array);
  });

  window.imgFilter = {
    choose: chooseFilter,
  };
})();
