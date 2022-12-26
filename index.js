
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupSaveButton = document.querySelector('.popup__save-button');
const elements = document.querySelector('.elements');
const elementLikeButton = document.querySelectorAll('.element__like-button');
const formElement = document.forms.addProfile;

//открытие попапа
profileEditButton.addEventListener('click', (event) => {
    popup.classList.add('popup_open');
});

  //функция открытия попапов
  function popupOpen(popup) {
    popup.classList.add('popup_open');
  };
  
// внесение данных в форму и редактирование профиля
formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = formElement.elements.addName.value;
    profileDescription.textContent = formElement.elements.addDescription.value;
});

function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputProfile.value;
    profileProfession.textContent = jobInputProfile.value;
    closePopup(popupProfile);
  }

//закрытие попапа
popupCloseButton.addEventListener('click', (event) => {
    popup.classList.remove('popup_open');
});

popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget)
        popup.classList.remove('popup_open');
});

popupSaveButton.addEventListener('click', (event) => {
    popup.classList.remove('popup_open');
});

toggleModal();


// функция попапа профиля


  //функция закрытия попапов
  function closePopup(popups) {
    popups.classList.remove('popup_open');
  };



// слушатели попапа профиля
formProfile.addEventListener('submit', handleFormProfileSubmit);

popupProfileCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

profileButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileProfession.textContent;
});





//кнопка лайк

for (var i = 0; i < elementLikeButton.length; i++) {
    elementLikeButton[i].addEventListener('click', like);
}

function like() {
    this.classList.toggle('element__like-button_active');
}



