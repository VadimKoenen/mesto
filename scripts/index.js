//CONST
const cards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profileEditButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popup = document.querySelector('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInpit = popup.querySelector('[name="addName"]');
const profileDescriptionInput = popup.querySelector('[name="addDescription"]');
const formElement = document.forms.addProfile;
const elementLikeButtons = document.querySelectorAll('.element__like-button');
const popupProfile = document.querySelector('.popup-profile');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupСardAdd = document.querySelector('.popup-cardadd');
const elements = document.querySelector('.elements__list');
const popupPicture = document.querySelector('.popup-picture');
const element = document.querySelector('.element');
const popupPictureImage = popupPicture.querySelector('.popup-picture__image');
const popupPictureHeading = popupPicture.querySelector('.popup-picture__heading');
const popupAddPlace = document.querySelector('.popup-cardadd');
const placeForm = popupAddPlace.querySelector('[name="addCard"]');
const placeInput = popupAddPlace.querySelector('[name="addNamePlace"]');
const imageInput = popupAddPlace.querySelector('[name="Link"]');

//открытие попапа
function openPopup(popup) {
    popup.classList.add('popup_open');
};

// внесение данных в форму и редактирование профиля
function handleFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = profileNameInpit.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(popup);
};

//открытие редактирования профиля
profileEditButton.addEventListener('click', (event) => {
    profileNameInpit.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup(popupProfile);
});
formElement.addEventListener('submit', handleFormSubmit);

//закрытие попапа
function closePopup(popups) {
    popups.classList.remove('popup_open');
};

// закрытие на крестик
popupCloseButtons.forEach(function (btn) {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', (event) => closePopup(popup));
});

// закрытие при нажатие оверлей
popupCloseButtons.forEach(function (btn) {
    const popup = btn.closest('.popup');
    popup.addEventListener('click', (event) => {
        if (event.target === event.currentTarget)
            closePopup(popup);
    });
})

//открытие попапа с добавлением карточки
buttonAddCard.addEventListener('click', function () {
    openPopup(popupСardAdd);
});

// функция лайк  
function likeCard(event) {
    event.target.classList.toggle('element__like-button_active');
};

// функция удаления карточки
function deleteCard(event) {
    event.currentTarget.closest('.element').remove();
}

//функция открытия третьего попапа:
function openPopupZoom(event) {
    popupPictureHeading.textContent = event.target.alt;
    popupPictureImage.src = event.target.src;
    popupPictureImage.alt = event.target.alt;
    openPopup(popupPicture);
}
//функция навешивания слушателей на вновь создаваемую карточку
function addEventListeners(card) {
    card.querySelector('.element__image').addEventListener('click', openPopupZoom);
    card.querySelector('.element__like-button').addEventListener('click', likeCard);
    card.querySelector('.element__delete-button').addEventListener('click', deleteCard);
};
//функция создания карточки
function createCard(card) {
    const newCard = document.querySelector('.elements-template').content.cloneNode(true)
    const elementText = newCard.querySelector('.element__text')
    elementText.textContent = card.name
    const cardImage = newCard.querySelector('.element__image')
    cardImage.setAttribute('src', card.link)
    cardImage.setAttribute('alt', card.name)
    addEventListeners(newCard)
    return newCard
}

//функция добавления карточки
function addCard(card) {
    elements.prepend(card);
}

//функция рендера карточки
function renderCards(cardsList) {
    cardsList.forEach(item => {
        const cardHtml = createCard(item);
        addCard(cardHtml);
    });
}

//функция сабмита добавления карточки
function submitForm(event) {
    event.preventDefault();
    const submitCard = createCard({
        name: placeInput.value,
        link: imageInput.value
    });
    addCard(submitCard);
}

//навешивание слушателя на отправку формы
placeForm.addEventListener('submit', submitForm);

// запуск рендера
renderCards(cards);

