'use strict';

(function () {
  var PHOTO_DESCRIPTION = ['Еда', 'Машина', 'Знак', 'Кот'];
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var POSSIBLE_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var COMMENTS_MIN = 0;
  var COMMENTS_MAX = 10;
  var AVATAR_FIRST = 1;
  var AVATAR_LAST = 6;
  var NAMES = ['Артем', 'Дар', 'Тея', 'Лис', 'Чиер', 'Бес', 'Кекс'];

  var getRandomNumber = window.util.getRandomNumber;
  var getRandomArrayIndex = window.util.getRandomArrayIndex;

  var getRandomsComment = function (count) {
    var comments = [];
    for (var i = 0; i < count; i++) {
      var comment = {
        'avatar': 'img/avatar-' + getRandomNumber(AVATAR_FIRST, AVATAR_LAST) + '.svg',
        'message': getRandomArrayIndex(POSSIBLE_COMMENTS),
        'name': getRandomArrayIndex(NAMES),
      };
      comments.push(comment);
    }
    return comments;
  };

  var getArrayOfPictures = function (count) {
    var photos = [];
    for (var i = 0; i < count; i++) {
      var photo = {
        'url': 'photos/' + (i + 1) + '.jpg',
        'description': getRandomArrayIndex(PHOTO_DESCRIPTION),
        'likes': getRandomNumber(LIKES_MIN, LIKES_MAX),
        'comments': getRandomsComment(getRandomNumber(COMMENTS_MIN, COMMENTS_MAX)),
      };
      photos.push(photo);
    }
    return photos;
  };

  window.data = {
    getArrayOfPictures: getArrayOfPictures,
  };

})();
