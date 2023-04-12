export default class FormValidator {
  constructor(setup, form) {
    this._setup = setup;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(setup.inputSelector));
    this._buttonElement = this._form.querySelector(setup.submitButtonSelector);
  }

  // проверка валидных инпутов
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  // добавление ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._setup.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._setup.errorClass);
  }
  // удаление ошибки
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._setup.inputErrorClass);
    errorElement.classList.remove(this._setup.errorClass);
    errorElement.textContent = '';
  }

  // смена статуса кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._disableButton();
    } else {
      this._buttonElement.classList.remove(this._setup.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }
// неактивная кнопка
  _disableButton() {
    this._buttonElement.classList.add(this._setup.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  };

//слушатели
  enableValidation() {
    this._setEventListeners();
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }


// валидно
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

// очистка
  clearErrorForm() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

}