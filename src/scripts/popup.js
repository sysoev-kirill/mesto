export default class Popup {
	constructor(popupSelector) {
		this._popup = popupSelector;
		this._closeButtons = this._popup.querySelector('.popup__close-btn');
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	_handleEscClose(event) {
		if (event.key === 'Escape') {
			this.closePopup();
		}
	}

	openPopup() {
		this._popup.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
	}

	closePopup() {
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}


	setEventListeners() {
		this._closeButtons.addEventListener('click', () => {
			this.closePopup();
		});
		this._popup.addEventListener('click', (event) => {
			if (event.target.classList.contains('popup')) {
				this.closePopup();
			}
		});
	}
}
