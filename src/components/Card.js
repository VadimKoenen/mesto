export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    userId,
    likeCard,
    dislikeCard,
    handleCardConfirm
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.ownerId;
    this._userId = userId;
    this._handleCardConfirm = handleCardConfirm;
    this._likeCard = likeCard;
    this._dislikeCard = dislikeCard;
  };

  //темплейт
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardTemplate;
  }
  //удаление карточки
  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  // установка лайка
  handleLike() {
    this._elementLikeButton.classList.toggle('element__like-button_active');
  }

  getLikesTotal(data) {
    this._likeTotal.textContent = `${data.likes.length}`;
  }


  //проверка лайка
  _isLiked() {
    if (this._likes.some((user) => user._id === this._userId))
      this.handleLike();
  }


  _setListeners() {
    //открытие изображения
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    // удаление карточки
    this._deleteButton.addEventListener('click', () => this._handleCardConfirm(this));

    // лайк
    this._elementLikeButton.addEventListener('click', () => {
      if (this._elementLikeButton.classList.contains('element__like-button_active')) {
        this._dislikeCard();
      } else {
        this._likeCard();
      }
    });

  }


  generateCard() {
    this._card = this._getTemplate(); //
    this._cardImage = this._card.querySelector('.element__image'); //
    this._userCardText = this._card.querySelector('.element__text');
    this._elementLikeButton = this._card.querySelector('.element__like-button');
    this._cardImage.src = this._link;
    this._cardImage.title = this._name;
    this._cardImage.alt = this._name;
    this._userCardText.textContent = this._name;
    this._userCardText.title = this._name;
    this._deleteButton = this._card.querySelector('.element__delete-button');
    if (this._ownerId !== this._userId) {       //удаление кнопки делит прочего юзера
      this._deleteButton.remove();
    }
    this._isLiked();
    this._card.id = `${this._id}`;
    this._likeTotal = this._card.querySelector('.element__like-meter');
    this._likeTotal.textContent = `${this._likes.length}`;
    this._setListeners();
    return this._card;
  }

}