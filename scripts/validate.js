//--------------------Проверка полей-----------------

const checkInputValidity = (input) => {
   const errorElement = input.nextElementSibling;
   errorElement.textContent = input.validationMessage;
   errorElement.classList.toggle('popup__error_active', !input.validity.valid);
}



const setEventListeners = (form, buttonSelector, settings) => {
   form.addEventListener('input', (event) => {
      checkInputValidity(event.target, settings);
      toggleButtonState(form.querySelector(buttonSelector), form.checkValidity(), settings);
   });
   form.addEventListener('submit', (evt) => {
      evt.preventDefault();
   });
};

//----------------------переключение кнопки -------------------
const toggleButtonState = (button, isActive, settings) => {
   button.disabled = !isActive;
   button.classList.toggle(settings.inactiveButtonClass, !isActive);
};