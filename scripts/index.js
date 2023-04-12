import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import cards from "./cards.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInpit = document.querySelector('[name="addName"]');
const profileDescriptionInput = document.querySelector('[name="addDescription"]');
const formAddProfile = document.forms.addProfile;
const popupProfile = document.querySelector('.popup-profile');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupCardAdd = document.querySelector('.popup-cardadd');
const elements = document.querySelector('.elements__list');
const popupPicture = document.querySelector('.popup-picture');
const popupPictureImage = popupPicture.querySelector('.popup-picture__image');
const popupPictureHeading = popupPicture.querySelector('.popup-picture__heading');
const popupAddPlace = document.querySelector('.popup-cardadd');
const formAddPlace = document.forms.addCard;
const placeInput = popupAddPlace.querySelector('[name="addNamePlace"]');
const imageInput = popupAddPlace.querySelector('[name="Link"]');



const setup = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__text_error',
    errorClass: 'popup__error-text_active',
};

const formProfileValidator = new FormValidator(setup, formAddProfile);
const formAddCardValidator = new FormValidator(setup, formAddPlace);


//открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', closeByEsc);
};

// внесение данных в форму и редактирование профиля
function submitFormProfile(event) {
    event.preventDefault();
    profileName.textContent = profileNameInpit.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(popupProfile);
    formAddProfile.reset();
};

//открытие редактирования профиля
profileEditButton.addEventListener('click', (event) => {
    profileNameInpit.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup(popupProfile);
});
formAddProfile.addEventListener('submit', submitFormProfile);

//закрытие попапа
function closePopup(popup) {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', closeByEsc);
};

// закрытие на крестик
popupCloseButtons.forEach(function (btn) {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', (event) => closePopup(popup));
});


// закрытие при нажатие оверлей
popups.forEach(function (popup) {
    popup.addEventListener('click', (event) => {
        if (event.target === event.currentTarget) {
            closePopup(popup)
        }
    });
});

// закрытие на клавишу ESC
function closeByEsc(event) {
    if (event.key === 'Escape') {
        const openPopup = document.querySelector('.popup_open');
        closePopup(openPopup);
    };
};

//открытие попапа с добавлением карточки
buttonAddCard.addEventListener('click', function () {
    openPopup(popupCardAdd);
});

//функция открытия третьего попапа:
function openPopupZoom(name, link) {
    popupPictureHeading.textContent = name;
    popupPictureImage.src = link;
    popupPictureImage.alt = name;
    openPopup(popupPicture);
}

function generateCard(data) {
    const card = new Card(data, '.elements-template', openPopupZoom);
    return card.generateCard();
}

function prependCard(data) {
    elements.prepend(generateCard(data));
}

function renderStartCards() {
    cards.reverse().forEach(data => {
        prependCard(data);
    });
};

function handleCardSubmit(event) {
    event.preventDefault();
    prependCard({
        name: placeInput.value,
        link: imageInput.value
    });
    formAddPlace.reset();
    closePopup(popupCardAdd);
}

formAddPlace.addEventListener('submit', handleCardSubmit);

renderStartCards();
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();


