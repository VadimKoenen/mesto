export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);

    };
    //открытие
    open() {
        this._popup.classList.add('popup_open');
    }
    //закрытие
    close() {
        this._popup.classList.remove('popup_open');
    }

    //закрытие ESC
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setListeners() {
        //закрытие по клику на оверлей
        this._popup.addEventListener('mousedown', (event) => {
            if (event.target === this._popup) {
                this.close();
            }
        });
        //закрытие esc
        window.addEventListener("keydown", (event) => {
            this._handleEscClose(event);//esc
        });

        //закрытие по клику на кнопку закрыть
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.close());
    }

}

