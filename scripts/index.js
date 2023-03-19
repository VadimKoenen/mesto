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
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileNameInpit = document.querySelector('[name="addName"]');
const profileDescriptionInput = document.querySelector('[name="addDescription"]');
const formAddProfile = document.forms.addProfile;
const popupProfile = document.querySelector('.popup-profile');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupСardAdd = document.querySelector('.popup-cardadd');
const elements = document.querySelector('.elements__list');
const popupPicture = document.querySelector('.popup-picture');
const popupPictureImage = popupPicture.querySelector('.popup-picture__image');
const popupPictureHeading = popupPicture.querySelector('.popup-picture__heading');
const popupAddPlace = document.querySelector('.popup-cardadd');
const formAddPlace = document.forms.addCard;
const placeInput = popupAddPlace.querySelector('[name="addNamePlace"]');
const imageInput = popupAddPlace.querySelector('[name="Link"]');

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
    openPopup(popupСardAdd);
});

// функция лайка  
function toggleLike(event) {
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
function addEventListenersCard(card) {
    card.querySelector('.element__image').addEventListener('click', openPopupZoom);
    card.querySelector('.element__like-button').addEventListener('click', toggleLike);
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
    addEventListenersCard(newCard)
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
function submitFormCardAdd(event) {
    event.preventDefault();
    const submitCard = createCard({
        name: placeInput.value,
        link: imageInput.value
    });
    addCard(submitCard);
    formAddPlace.reset();
    closePopup(popupСardAdd);
}

//навешивание слушателя на отправку формы
formAddPlace.addEventListener('submit', submitFormCardAdd);

// запуск рендера
renderCards(cards);
