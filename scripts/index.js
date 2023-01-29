const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInpit = popup.querySelector('[name="addName"]');
const profileDescriptionInput = popup.querySelector('[name="addDescription"]');
const formElement = document.forms.addProfile;

//открытие попапа
function openPopup() {
    popup.classList.add('popup_open');
};

//закрытие попапа
function closePopup() {
    popup.classList.remove('popup_open');
};

// внесение данных в форму и редактирование профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInpit.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup();
};

//event-listeners
profileEditButton.addEventListener('click', (event) => {
    profileNameInpit.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup();
});
formElement.addEventListener('submit', handleFormSubmit);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget)
        closePopup;
});
