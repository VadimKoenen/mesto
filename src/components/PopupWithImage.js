import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector('.popup-picture__image');
    this._userCardText = this._popup.querySelector('.popup-picture__heading');
  }
  //открытие картинки
  open(name, link) {
    super.open();
    this._cardImage.src = link;
    this._cardImage.alt = name;
    this._userCardText.textContent = name;
  }
}