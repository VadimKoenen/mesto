import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import cards from "../components/cards.js";
import './index.css';

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
// валидация
const formProfileValidator = new FormValidator(setup, formAddProfile);
const formAddCardValidator = new FormValidator(setup, formAddPlace);

formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

// User info
const userInfo = new UserInfo({ profileName, profileDescription });
console.log(profileName)
console.log(userInfo)


// Попап с картинкой
const popupWithImage = new PopupWithImage(
  '.popup-picture',
  popupPictureImage,
  popupPictureHeading);

popupWithImage.setListeners();


// Попап профиля
const popupProfileEdit = new PopupWithForm('.popup-profile',
  (inputValues) => {
    userInfo.setUserInfo(inputValues["addName"], inputValues["addDescription"])
  });

popupProfileEdit.setEventListeners();


// Попап добавления карточки
const popupAddPlaceEdit = new PopupWithForm(
  '.popup-cardadd',
  (inputValues) => {
    const card = createCard(inputValues["addNamePlace"], inputValues["Link"]);
    section.addItem(card);
  }
);
popupAddPlaceEdit.setEventListeners();

//UserCards
const section = new Section({
  data: cards,
  renderer: (data) => {
    const card = createCard(data.name, data.link);
    section.addItem(card);
  },
},
  elements);
section.renderer();

// Card
function createCard(name, link) {
  const card = new Card(
    { name: name, link: link },
    '.elements-template',
    (name, link) => {
      popupWithImage.open(name, link);
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//листенер открытия попапа профиля
profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profileNameInpit.value = userData.name;
  profileDescriptionInput.value = userData.description;
  popupProfileEdit.open();
});

//листенер открытия попапа кард
buttonAddCard.addEventListener('click', () => {
  popupAddPlaceEdit.open();
  formAddCardValidator.enableValidation()
});
