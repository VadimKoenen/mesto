import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__text'));
    this._submitForm = submitForm;
    this._submitButton = this._form.querySelector('.popup__save-button');
  }

  //получение значений
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(
      (input) => (this._inputValues[input.name] = input.value)
    );
    return this._inputValues;
  }


  setEventListeners() {
    super.setListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  submitButtonStatus(text) {
    this._submitButton.textContent = text;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

}


