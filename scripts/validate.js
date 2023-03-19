const setup = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__text_error',
    errorClass: 'popup__error-text_active',
};

// функция добавления ошибки
const showInputError = (formElement, inputElement, errorMessage, setup) => {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(setup.inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(setup.errorClass);
};

// функция кнопки-сабмита
const toggleButtonState = (inputs, buttonElement, setup) => {
    if (hasInvalidInput(inputs, setup)) {
        disableButton(buttonElement, setup);
    } else {
        buttonElement.classList.remove(setup.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

// функция удаления стиля с кнопки
function disableButton(buttonElement, setup) {
    buttonElement.classList.add(setup.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
};

// функция удаления ошибки
const hideInputError = (formElement, inputElement, setup) => {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(setup.inputErrorClass);
    inputError.classList.remove(setup.errorClass);
    inputError.textContent = '';
};

// функция проверки валидных инпутов
const hasInvalidInput = (inputs) => {
    return inputs.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// функция проверки валидности формы
const checkInputValidity = (formElement, inputElement, setup) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, setup);
    } else {
        hideInputError(formElement, inputElement, setup);
        ;
    }
};

// слушатели
const setEventListeners = (formElement, setup) => {
    const inputs = Array.from(formElement.querySelectorAll(setup.inputSelector));
    const buttonElement = formElement.querySelector(setup.submitButtonSelector);
    toggleButtonState(inputs, buttonElement, setup);
    formElement.addEventListener('reset', function () {
        disableButton(buttonElement, setup);
    });
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, setup);
            toggleButtonState(inputs, buttonElement, setup);
        });
    });
};

// функция включения валидации
const enableValidation = (setup) => {
    const formList = Array.from(document.querySelectorAll(setup.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (event) {
            event.preventDefault();
        });
        setEventListeners(formElement, setup);
    });
};

enableValidation(setup);





