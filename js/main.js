'use strict';

var PHOTO_COUNT = 25;
var PHOTO_DESCRIPTION = ['Здесь', 'Там', 'Везде'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var POSSIBLE_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 3;
var AVATAR_FIRST = 1;
var AVATAR_LAST = 6;
var NAMES = ['Артем', 'Дар', 'Тея', 'Лис', 'Чиер', 'Бес', 'Кекс'];

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomArrayIndex = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

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

var arrayOfPictures = getArrayOfPictures(PHOTO_COUNT);
renderAllPictures(arrayOfPictures);
