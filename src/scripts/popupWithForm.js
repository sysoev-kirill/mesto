import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, submitHandler) {
		super(popupSelector);
		this._submitHandler = submitHandler;
		this._form = this._popup.querySelector(".popup__form");
		this._inputList = this._form.querySelectorAll(".popup__profile");
		this._submitButton = this._form.querySelector(".popup__send-btn");
	}

	_getInputValues() {
		const values = {};
		this._inputList.forEach(input => {
			values[input.name] = input.value;
		});
		console.log(values)
		return values;
	}

	_handleSubmitForm(evt) {
		evt.preventDefault();
		if (typeof this._submitHandler === "function") {
			const formValues = this._getInputValues();
			this._submitHandler(formValues);
		}
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener("submit", (evt) =>
			this._handleSubmitForm(evt)
		);
	}

	closePopup() {
		super.closePopup();
		this._form.reset();
	}

	isSavingMessage(loading){
		this._submitButton.textContent = loading;
	
	}
}


