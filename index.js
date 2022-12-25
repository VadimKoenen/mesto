
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupSaveButton = document.querySelector('.popup__save-button');
const formElement = document.forms.addProfile;
const nameInput = formElement.elements.addName;
const descriptionInput = formElement.elements.addDescription;


//открытие попапа
profileEditButton.addEventListener('click', (event) => {
    popup.classList.add('popup_open');
});


// внесение данных в форму и редактирование профиля
formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
})

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


