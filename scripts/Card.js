export default class Card {
  constructor(data, templateSelector, openPopupZoom) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopupZoom = openPopupZoom;
  };

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element');
  }

  _setListeners() {
    this._card.querySelector('.element__delete-button').addEventListener('click', () => this._deleteCard());
    this._elementLikeButton.addEventListener('click', () => this._likeCard());
    this._cardImage.addEventListener('click', () => this._openPopupZoom(this._name, this._link, this._fotoName));
  }

  _deleteCard() {
    this._card.remove();
  }

  _likeCard() {
    this._elementLikeButton.classList.toggle('element__like-button_active');
  }

  generateCard() {
    this._card = this._getTemplate().cloneNode(true);
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