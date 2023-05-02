import Popup from "./popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { checkDelite }) {
    super(popupSelector);
    this._buttonConfirm = this._popup.querySelector(".popup__send-btn");
    this._handleCheckConfirm = checkDelite;
    this._form = this._popup.querySelector(".popup__form");

  }

  openPopup(cardId, element) {
    this._cardId = cardId;
    this._element = element;
    super.openPopup();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleCheckConfirm(this._cardId, this._element);
    });
  }
}

