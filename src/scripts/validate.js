export class FormValidator {
   constructor(settings, form) {
      this._form = form;
      this._formSelector = settings.formSelector;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
      this._submitButton = this._form.querySelector(this._submitButtonSelector);
      this._errorElements = this._form.querySelectorAll(`.${this._inputErrorClass}`);
   }

   _checkInputValidity(inputSelector) {
      const errorElement = inputSelector.nextElementSibling;
      errorElement.textContent = inputSelector.validationMessage;
      errorElement.classList.toggle(this._inputErrorClass, !inputSelector.validity.valid);
   }


   _toggleSubmitButtonState() {

      if (!this._form.checkValidity()) {
         this._submitButton.classList.add(this._inactiveButtonClass);
         this._submitButton.disabled = true;
      } else {
         this._submitButton.classList.remove(this._inactiveButtonClass);
         this._submitButton.disabled = false;
      }
   }

   activateSubmitButton() {
      this._submitButton.disabled = false;
   }

   deactivateSubmitButton() {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
   }

   clearErrors() {
      this._errorElements.forEach((errorElement) => {
         errorElement.textContent = '';
         errorElement.classList.remove(this._inputErrorClass);
      });
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
      this.deactivateSubmitButton();
   }

}