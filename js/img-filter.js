'use strict';

(function () {

  var filterDiscussed = function (array) {
    window.util.deletePictures();

    window.picture.renderAll(array.slice().sort(function (left, right) {
      var popularDiff = right.comments.length - left.comments.length;
      return popularDiff;
    }));
  };

  var filterPopular = function (array) {
    window.util.deletePictures();

    window.picture.renderAll(array);
  };

  var filteRandom = function (array) {
    window.util.deletePictures();
    window.picture.renderAll(array.slice(0, 10));
  };

  var filters = {
    'filter-popular': filterPopular,
    'filter-random': filteRandom,
    'filter-discussed': filterDiscussed,
  };

  window.imgFilter = {
    filters: filters,
  };
})();
