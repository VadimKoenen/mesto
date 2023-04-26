export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);

    };
    //открытие
    open() {
        this._popupSelector.classList.add('popup_open');
    }
    //закрытие
    close() {
        this._popupSelector.classList.remove('popup_open');
    }

    //закрытие ESC
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setListeners() {
        //закрытие по клику на оверлей
        this._popupSelector.addEventListener('mousedown', (event) => {
            if (event.target === this._popupSelector) {
                this.close();
            }
        });
        //закрытие по клику на кнопку закрыть
        this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => this.close());
    }

}