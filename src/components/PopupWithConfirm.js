import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._applySubmit = applySubmit; //внешн ф-я для вызова по сабмиту
    this._form = this._popup.querySelector('.popup__form');
  }



  setEventListeners() {
    super.setListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitConfirm();
    });
  }


  setConfirm(confirm) {
    this._submitConfirm = confirm;
  }
}

