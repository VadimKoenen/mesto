export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardTemplate;
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _likeCard() {
    this._elementLikeButton.classList.toggle('element__like-button_active');
  }

  _setListeners() {
    this._card.querySelector('.element__delete-button').addEventListener('click', () => this._deleteCard());
    this._elementLikeButton.addEventListener('click', () => this._likeCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }


  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.element__image');
    this._userCardText = this._card.querySelector('.element__text');
    this._elementLikeButton = this._card.querySelector('.element__like-button');
    this._cardImage.src = this._link;
    this._cardImage.title = this._name;
    this._cardImage.alt = this._name;
    this._userCardText.textContent = this._name;
    this._userCardText.title = this._name;
    this._setListeners();
    return this._card;
  }

}