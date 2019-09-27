'use strict';

var PHOTO_COUNT = 25;
var PHOTO_DESCRIPTION = ['Еда', 'Машина', 'Знак', 'Кот'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var POSSIBLE_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 10;
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

var viewPhoto = function (picture) {
  var getComments = function (comments) {
    var commentsContainer = bigPicture.querySelector('.social__comments');
    var commentTemplate = bigPicture.querySelector('.social__comment');
    while (commentsContainer.firstChild) {
      commentsContainer.removeChild(commentsContainer.firstChild);
    }
    for (var i = 0; i < comments.length; i++) {
      var comment = commentTemplate.cloneNode(true);
      comment.querySelector('.social__picture').src = comments[i].avatar;
      comment.querySelector('.social__picture').alt = comments[i].name;
      comment.querySelector('.social__text').textContent = comments[i].message;
      commentsContainer.appendChild(comment);
    }
  };

  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.big-picture__img img').alt = picture.description;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  getComments(picture.comments);
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
};

var arrayOfPictures = getArrayOfPictures(PHOTO_COUNT);
var bigPicture = document.querySelector('.big-picture');

// renderAllPictures(arrayOfPictures);
// viewPhoto(arrayOfPictures[0]);

// bigPicture.classList.remove('hidden');

var upload = document.querySelector('.img-upload__overlay');
var uploadOpen = document.querySelector('#upload-file');
var uploadClose = document.querySelector('#upload-cancel');

uploadOpen.addEventListener('change', function () {
  upload.classList.remove('hidden');
});

uploadClose.addEventListener('click', function () {
  upload.classList.add('hidden');
});
