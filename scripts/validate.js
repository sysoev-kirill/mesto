
export class FormValidator {
   constructor(settings, form) {
      this._form = form;
      this._formSelector = settings.formSelector;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;

   }

   _checkInputValidity(inputSelector) {
      const errorElement = inputSelector.nextElementSibling;
      errorElement.textContent = inputSelector.validationMessage;
      errorElement.classList.toggle(this._inputErrorClass, !inputSelector.validity.valid);
   }


   _toggleSubmitButtonState() {
      const submitButtonSelector = this._form.querySelector(this._submitButtonSelector);
      if (!this._form.checkValidity()) {
         submitButtonSelector.classList.add(this._inactiveButtonClass);
         submitButtonSelector.disabled = true;
      } else {
         submitButtonSelector.classList.remove(this._inactiveButtonClass);
         submitButtonSelector.disabled = false;
      }
   }

   _setEventListeners() {
      this._form.addEventListener('input', (event) => {
         this._checkInputValidity(event.target);
         this._toggleSubmitButtonState();
      });
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
   }

   enableValidation() {
      this._setEventListeners();
      this._toggleSubmitButtonState();
   }

}

