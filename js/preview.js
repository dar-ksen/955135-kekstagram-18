'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var closeButton = bigPicture.querySelector('#picture-cancel');

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  };

  var viewPhoto = function (picture) {
    var getComments = function (comments) {
      var commentsContainer = bigPicture.querySelector('.social__comments');
      var commentTemplate = bigPicture.querySelector('.social__comment');
      window.util.cleanContainer(commentsContainer);
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
    // Временно
    // bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    // bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  closeButton.addEventListener('click', closeBigPicture);

  window.preview = {
    viewPhoto: viewPhoto,
  };
})();
