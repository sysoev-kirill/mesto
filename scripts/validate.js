//--------------------Проверка полей-----------------

const checkInputValidity = (inputSelector) => {
   const errorElement = inputSelector.nextElementSibling;
   errorElement.textContent = inputSelector.validationMessage;
   errorElement.classList.toggle( inputSelector.errorClass, !inputSelector.validity.valid);
}

//_______переключение кнопки 
function toggleSubmitButtonState(formSelector, submitButtonSelector, inactiveButtonClass) {
   if (!formSelector.checkValidity()) {
      submitButtonSelector.classList.add(inactiveButtonClass);
      submitButtonSelector.disabled = true;
   } else {
      submitButtonSelector.classList.remove(inactiveButtonClass);
      submitButtonSelector.disabled = false;
   }
}

const setEventListeners = (formSelector, buttonSelector, settings, inactiveButtonClass) => {
   formSelector.addEventListener('input', (event) => {
      checkInputValidity(event.target, settings);
      toggleSubmitButtonState(formSelector, formSelector.querySelector(buttonSelector), inactiveButtonClass);
   });
   formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
   });
};


//-------------------------------------Валидация форм-----------------

const enableValidation = (settings) => {
   const defaultSettings = {
      formSelector: '.popup__form',
      inputSelector: '.popup__profile',
      submitButtonSelector: '.popup__send-btn',
      inactiveButtonClass: 'popup__send-btn_inactive',
      inputErrorClass: 'popup__error',
      errorClass: 'popup__error_active'
   };

   const finalSettings = {};
   for (let prop in defaultSettings) {
      finalSettings[prop] = settings[prop] || defaultSettings[prop];
   }

   const forms = document.querySelectorAll(finalSettings.formSelector);
   forms.forEach((form) => {
      setEventListeners(form, finalSettings.submitButtonSelector, finalSettings);
      toggleSubmitButtonState(form, form.querySelector(finalSettings.submitButtonSelector), finalSettings.inactiveButtonClass );
   });
};

enableValidation({
   formSelector: '.popup__form',
   inputSelector: '.popup__profile',
   submitButtonSelector: '.popup__send-btn',
   inactiveButtonClass: 'popup__send-btn_inactive',
   inputErrorClass: 'popup__error',
   errorClass: 'popup__error_active'
});

