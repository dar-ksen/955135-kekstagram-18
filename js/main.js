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

/*
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
viewPhoto(arrayOfPictures[0]);

bigPicture.classList.remove('hidden');
*/

var changeEffects = function () {
  var checkedEffect = imageEffects.querySelector('input:checked');
  var sliderOfset = pinSlider.offsetLeft / pinSlider.parentNode.offsetWidth;

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
      uploadImage.style.filter = 'brightness(' + sliderOfset * 3 + ')';
      break;
    default:
      uploadImage.style.removeProperty('filter');
      break;
  }
};

// scale

var SCALE_STEP = 25;
var MIN_SCALE_VALUE = '25%';
var MAX_SCALE_VALUE = '100%';

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

// scale

var openPopup = function () {
  upload.classList.remove('hidden');
  scaleControl.value = MAX_SCALE_VALUE;
  changeScale();
  scaleDec.addEventListener('click', onScaleDecClick);
  scaleInc.addEventListener('click', onScaleIncClick);
  imageEffects.addEventListener('change', changeEffects);
  document.addEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  window.util.isEscEvent(evt, closePopup);
};

var closePopup = function () {
  upload.classList.add('hidden');
  scaleDec.removeEventListener('click', onScaleDecClick);
  scaleInc.removeEventListener('click', onScaleIncClick);
  imageEffects.removeEventListener('change', changeEffects);
  document.removeEventListener('keydown', onPopupEscPress);
  form.reset();
};

// валидация
var hashtagInput = document.querySelector('.text__hashtags');

hashtagInput.addEventListener('input', function () {
  var hashtagError = validateHashtags(hashtagInput.value);
  hashtagInput.setCustomValidity(hashtagError);
});

var validateHashtags = function (userInput) {
  var message = '';
  if (userInput !== '') {
    var arrayHashtags = userInput.toLowerCase().split(' ');

    if (arrayHashtags.length > 5) {
      message = 'Вы не можете использовать больше 5 хэштегов';
    } else {
      for (var i = 0; i < arrayHashtags.length; i++) {
        var hashtag = arrayHashtags[i];

        if (hashtag[0] !== '#') {
          message = 'Вы забыли поставить знак #';
        }

        if (hashtag === '#') {
          message = 'Вы не ввели текст хэштэга';
        }

        var cutHashtag = hashtag.slice(1);

        if (cutHashtag.indexOf('#') !== -1) {
          message = 'Вы забыли поставить пробел между хэштегами';
        }

        if (arrayHashtags.indexOf(hashtag) !== i) {
          message = 'Вы уже использовали данный хэштег';
        }

        if (hashtag.length > 20) {
          message = 'Длина хэштега должна быть не больше 20 символов, включая решётку';
        }
      }
    }

  }

  return message;
};


var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
// var bigPicture = document.querySelector('.big-picture');

var upload = document.querySelector('.img-upload__overlay');
var uploadOpen = document.querySelector('#upload-file');
var uploadClose = upload.querySelector('#upload-cancel');

var pinSlider = document.querySelector('.effect-level__pin');

var uploadImage = upload.querySelector('.img-upload__preview img');
var imageEffects = upload.querySelector('.effects');
var form = document.querySelector('.img-upload__form');

// контроль размеров
var scaleControl = upload.querySelector('.scale__control--value');
var scaleDec = upload.querySelector('.scale__control--smaller');
var scaleInc = upload.querySelector('.scale__control--bigger');

uploadOpen.addEventListener('change', function () {
  openPopup();
});

uploadClose.addEventListener('click', closePopup);

var arrayOfPictures = getArrayOfPictures(PHOTO_COUNT);
renderAllPictures(arrayOfPictures);
