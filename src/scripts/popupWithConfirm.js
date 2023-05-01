import Popup from "./popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector,) {
    super(popupSelector);
	  this._buttonConfirm = this._popup.querySelector(".popup__send-btn");
    this._form = this._popup.querySelector(".popup__form");
  }
  
  openPopup(card) {
    this._card = card;
    super.openPopup();
  }

  handleCheckConfirm(checkConfirm) {
    this._checkConfirm = checkConfirm;
  }
   
  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._checkConfirm();
    });
  }
}
