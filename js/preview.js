'use strict';

(function () {
  var DISPLAY_COMMENTS = 5;

  var body = window.util.body;
  var bigPicture = document.querySelector('.big-picture');
  var commentTemplate = bigPicture.querySelector('.social__comment');
  var closeButton = bigPicture.querySelector('#picture-cancel');
  var commentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var countOfComments;

  var onCloseButtonClick = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    window.util.isEscEvent(evt, onCloseButtonClick);
  };

  function showcommentCount() {
    var displayedComments = bigPicture.querySelectorAll('.social__comment:not(.visually-hidden)').length;
    var commentCountElement = displayedComments + ' из ' + '<span class="comments-count">' + countOfComments + '</span>' + ' комментариев';
    commentCount.innerHTML = commentCountElement;
  }

  function loadComments() {
    var commentElements = bigPicture.querySelectorAll('.social__comment.visually-hidden');
    var countHiddenElment = commentElements.length > DISPLAY_COMMENTS ? DISPLAY_COMMENTS : commentElements.length;
    for (var i = 0; i < countHiddenElment; i++) {
      commentElements[i].classList.remove('visually-hidden');
    }
    if (bigPicture.querySelectorAll('.social__comment.visually-hidden').length === 0) {
      commentsLoader.classList.add('hidden');
    }
  }

  function createComment(comment) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').title = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  }

  var getComments = function (comments) {
    var commentsList = bigPicture.querySelector('.social__comments');
    window.util.cleanContainer(commentsList);
    var fragment = document.createDocumentFragment();
    comments.forEach(function (currentItem, index) {
      var comment = createComment(currentItem);
      if (index >= DISPLAY_COMMENTS) {
        comment.classList.add('visually-hidden');
      }
      fragment.appendChild(comment);
    });
    commentsList.appendChild(fragment);
  };

  var viewPhoto = function (picture) {
    body.classList.add('modal-open');

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.big-picture__img img').alt = picture.description;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    getComments(picture.comments);
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
    countOfComments = picture.comments.length;
    showcommentCount();
    if (countOfComments > DISPLAY_COMMENTS) {
      commentsLoader.classList.remove('hidden');
    } else {
      commentsLoader.classList.add('hidden');
    }
  };

  commentsLoader.addEventListener('click', function () {
    loadComments();
    showcommentCount();
  });

  closeButton.addEventListener('click', onCloseButtonClick);

  window.preview = {
    viewPhoto: viewPhoto,
  };
})();
