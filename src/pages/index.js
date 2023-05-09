import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import './index.css';

const profileEditButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInpit = document.querySelector('.popup__text_profile-name');
const profileDescriptionInput = document.querySelector('.popup__text_profile-about');
const profileAvatar = document.querySelector('.profile__avatar');
const avatarInput = document.querySelector('.popup__text_avatar-link');
const formAvatar = document.forms.addAvatar;
const avatarEditButton = document.querySelector('.profile__overlay');
const formAddProfile = document.forms.addProfile;
const popupProfile = document.querySelector('.popup-profile');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupCardAdd = document.querySelector('.popup-cardadd');
const popupAvatar = document.querySelector('.popup-avatar');
const elements = document.querySelector('.elements__list');
const popupPicture = document.querySelector('.popup-picture');
const popupPictureImage = popupPicture.querySelector('.popup-picture__image');
const popupPictureHeading = popupPicture.querySelector('.popup-picture__heading');
const popupAddPlace = document.querySelector('.popup-cardadd');
const formAddPlace = document.forms.addCard;
const placeInput = popupAddPlace.querySelector('.popup__text_card-name');
const imageInput = popupAddPlace.querySelector('.popup__text_card-link');

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
const formAvatarValidator = new FormValidator(setup, formAvatar);

formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formAvatarValidator.enableValidation();

// User info
const userInfo = new UserInfo({ profileName, profileDescription, profileAvatar });
console.log(profileName)
console.log(userInfo);
console.log(profileAvatar);
let userId = null;


// Попап с картинкой
const popupWithImage = new PopupWithImage(
  '.popup-picture',
  popupPictureImage,
  popupPictureHeading);
// Слушатели Попапа с картинкой
popupWithImage.setListeners();


// Попап профиля
const popupProfileEdit = new PopupWithForm('.popup-profile',
  (data) => {
    //userInfo.setUserInfo(inputValues["addName"], inputValues["addDescription"])
    popupProfileEdit.submitButtonStatus('Сохранение...');
    api
      .setUser(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupProfileEdit.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupProfileEdit.submitButtonStatus('Сохранить');
      });
  });
// Слушатель попапа профиля
popupProfileEdit.setEventListeners();


// Попап аватара
const popupAvatarEdit = new PopupWithForm('.popup-avatar', ({ link }) => {
  popupAvatarEdit.submitButtonStatus('Сохранение...');
  api
    .changeAvatar(link)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatarEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatarEdit.submitButtonStatus('Сохранить');
    });
});
// Слушатель попапа аватара
popupAvatarEdit.setEventListeners();


// Попап добавления карточки
const popupAddPlaceEdit = new PopupWithForm(
  '.popup-cardadd',
  (data) => {
    popupAddPlaceEdit.submitButtonStatus('Создание...');
    api
      .addNewCard(data)
      .then((res) => {
        section.addItems(res);
        popupAddPlaceEdit.close();
      })
      .catch((err) => {
        console.log(err, 'ошибка карточки');
      })
      .finally(() => {
        popupAddPlaceEdit.submitButtonStatus('Cоздать');
      });
    //const card = createCard(inputValues["addNamePlace"], inputValues["Link"]);
    //section.addItem(card);
  }
);
popupAddPlaceEdit.setEventListeners();


// попап подтверждения удаления карточки
const popupWithConfirm = new PopupWithConfirm('.popup-confirm')
popupWithConfirm.setEventListeners();


//слушатель событий по кнопке редактирования профиля
profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profileNameInpit.value = userData.name;
  profileDescriptionInput.value = userData.about;
  popupProfileEdit.open();
});
//открытие кнопки добавления карточек
buttonAddCard.addEventListener('click', () => {
  popupAddPlaceEdit.open();
  formAddCardValidator.enableValidation()
});

//слушатель оверлея аватара
avatarEditButton.addEventListener('click', () => {
  popupAvatarEdit.open();
});


// Api
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-65',
  {
    authorization: 'fee96a15-e528-4768-b651-c080aa86fc96',
    "Content-Type": "application/json",
  }
);


//Получение данных с сервера
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData); //информация о пользователе
    section.renderItems(initialCards); //рендер карточек
  })
  .catch((err) => console.log(err));



// Card
function createCard(data) {
  const card = new Card(
    //data
    {
      name: data.name,
      link: data.link,
      id: data._id,
      likes: data.likes,
      ownerId: data.owner._id,
    },
    //templateSelector
    '.elements-template',

    //handleCardClick,
    (name, link) => {
      popupWithImage.open(name, link);
    },
    userId,
    //лайк
    () => {
      const like = api.addLike(data._id);
      like
        .then((data) => {
          card.handleLike();
          card.getLikesTotal(data);
        })
        .catch((err) => console.log(err));
    },

    //дизлайк
    () => {
      const disiLike = api.removeLike(data._id);
      disiLike
        .then((data) => {
          card.handleLike();
          card.getLikesTotal(data);
        })
        .catch((err) => console.log(err));
    },

    //handleCardConfirm
    () => {
      popupWithConfirm.open();
      popupWithConfirm.setConfirm(() => {
        api
          .deleteCard(data._id)
          .then(() => {
            card._deleteCard();
            popupWithConfirm.close();
          })
          .catch((err) => console.log(err));
      });
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}


//Section
const section = new Section((item) => createCard(item),
  elements);

