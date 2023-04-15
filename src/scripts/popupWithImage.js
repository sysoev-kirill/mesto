import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupPhotoElement = this._popup.querySelector(".increase-img__photo-view");
		this._popupPhotoDescription = this._popup.querySelector(".increase-img__name-view");
	}

	openPopup(photoValue, nameValue) {
		this._popupPhotoElement.src = photoValue;
		this._popupPhotoDescription.textContent = nameValue;
		this._popupPhotoElement.alt = nameValue;
		super.openPopup()
	}
}