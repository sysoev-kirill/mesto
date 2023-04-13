export default class Popup {
	constructor(popupSelector) {
		this._selector = popupSelector;
		this._closeButtons = this._selector.querySelector('.popup__close-btn');
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	_handleEscClose(event) {
		if (event.key === 'Escape') {
			this.closePopup();
		}
	}

	openPopup() {
		this._selector.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
	}

	closePopup() {
		this._selector.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}


	setEventListeners() {

		this._closeButtons.addEventListener('click', () => {
			this.closePopup();
		});

		this._selector.addEventListener('click', (event) => {
			if (event.target.classList.contains('popup')) {
				this.closePopup();
			}
		});

		document.addEventListener('click', (event) => {
			if (event.target.classList.contains('popup_opened')) {
				this.closePopup();
			}
		});
	}
}


