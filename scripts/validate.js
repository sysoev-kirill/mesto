
export class FormValidator {
   constructor(settings) {
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

   _toggleSubmitButtonState(formSelector, submitButtonSelector) {
      if (!formSelector.checkValidity()) {
         submitButtonSelector.classList.add(this._inactiveButtonClass);
         submitButtonSelector.disabled = true;
      } else {
         submitButtonSelector.classList.remove(this._inactiveButtonClass);
         submitButtonSelector.disabled = false;
      }
   }

   _setEventListeners(formSelector, buttonSelector) {
      formSelector.addEventListener('input', (event) => {
         this._checkInputValidity(event.target);
         this._toggleSubmitButtonState(formSelector, formSelector.querySelector(buttonSelector));
      });
      formSelector.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
   }

   enableValidation() {
      const forms = document.querySelectorAll(this._formSelector);
      forms.forEach((form) => {
         this._setEventListeners(form, this._submitButtonSelector);
         this._toggleSubmitButtonState(form, form.querySelector(this._submitButtonSelector));
      });
   }
}

const validator = new FormValidator({
   formSelector: '.popup__form',
   inputSelector: '.popup__profile',
   submitButtonSelector: '.popup__send-btn',
   inactiveButtonClass: 'popup__send-btn_inactive',
   inputErrorClass: 'popup__error',
   errorClass: 'popup__error_active'
});

validator.enableValidation();




