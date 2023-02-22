const profileEditButton = document.querySelector('.profile__edit-bnt');
const profilePopup = document.querySelector('.popup_open-profile');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');


function openPopup(popup) {
   popup.classList.add('popup_opened');

}

function closePopup(popup) {
   popup.classList.remove('popup_opened');
}

function fillProfileInputs() {
   inputFormName.value = nameProfile.textContent;
   inputFormDescription.value = descriptionProfile.textContent;
}


profileEditButton.addEventListener('click', () => {
   openPopup(profilePopup);
   fillProfileInputs();

})

const closeButtons = document.querySelectorAll('.popup__close-btn');
closeButtons.forEach((button) => {
   const popup = button.closest('.popup');
   button.addEventListener('click', () => closePopup(popup));
});


// --------------------------------------Попап с именем-----------------------

const profileForm = document.forms["popup__form-profile"];
const inputFormName = document.querySelector('.popup__profile_edit_name');
const inputFormDescription = document.querySelector('.popup__profile_edit_description');

function handleProfileSubmit(evt) {
   evt.preventDefault();
   nameProfile.textContent = inputFormName.value;
   descriptionProfile.textContent = inputFormDescription.value;
   closePopup(profilePopup);
}
profileForm.addEventListener('submit', handleProfileSubmit);




// --------------------------------------Добавление данных для формирования карочки---

const popUpPhoto = document.querySelector('.popup_open-photo');
const popUpAddPhotoButton = document.querySelector('.profile__add-btn');

popUpAddPhotoButton.addEventListener('click', () => {
   openPopup(popUpPhoto);
});

//------------------------------------- Формирование карточки ---------------

const cardsList = document.querySelector('.elements');

const cardTemplate = document.querySelector('#element').content;

function createCard(photoValue, nameValue) {
   const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
   const cardImage = cardElement.querySelector('.element__photo');
   const cardTitle = cardElement.querySelector('.element__city');
   const cardLikeButton = cardElement.querySelector('.element__heart');
   const cardDeleteButton = cardElement.querySelector('.element__trash');

   cardTitle.textContent = nameValue;
   cardImage.src = photoValue;
   cardImage.alt = nameValue;

   cardLikeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__heart_active');
   });

   cardDeleteButton.addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
   });

   cardImage.addEventListener('click', function (evt) {
      setImagePopupPhoto(photoValue, nameValue);
   });
   return cardElement;
}

function addCard(nameValue, photoValue) {
   const cardElement = createCard(nameValue, photoValue);
   cardsList.prepend(cardElement);
}


// -------------------------------------формирование карточек по умолчанию----------

const formPhoto = document.forms["popup__form-photo"];
const photo = document.querySelector('.popup__profile_add_photo');
const description = document.querySelector('.popup__profile_add_description');
formPhoto.addEventListener('submit', function (evt) {
   evt.preventDefault();
   addCard(photo.value, description.value);
   evt.target.reset();
   closePopup(popUpPhoto);
});


const initialCards = [
   ['./images/karachaevo.jpg', 'Карачаево-Черкессия'],
   ['./images/altay.jpg', 'Алтай'],
   ['./images/Donbuy.png', 'Кабардино-Балкария'],
   ['./images/crimea.jpg', 'Крым'],
   ['./images/baikal.jpg', 'Байкал'],
   ['./images/smolensk.jpg', 'Смоленск']
];

initialCards.map((item) => {
   addCard(item[0], item[1], cardsList);
});

//------------------------------------Открытие фотограии из карочки-----------

const popupIncreasePhoto = document.querySelector('.popup_mod-dark');

const popupPhotoElement = popupIncreasePhoto.querySelector(".increase-img__photo-view");
const popupPhotoDescription = popupIncreasePhoto.querySelector(".increase-img__name-view");

function setImagePopupPhoto(photoValue, nameValue) {
   openPopup(popupIncreasePhoto);
   popupPhotoElement.src = photoValue;
   popupPhotoElement.alt = nameValue;
   popupPhotoDescription.textContent = nameValue;
}



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
      toggleButtonState(form.querySelector(finalSettings.submitButtonSelector), form.checkValidity(), finalSettings);
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


// -------------------- Закрытия при  ESC------------------
function closePopupByEscKey(event) {
   const popup = document.querySelector('.popup_opened');
   if (event.key === 'Escape' && popup) {
      closePopup(popup);
   }
}

// ----------------------Закрытие на пустой области экрана--------------
function closePopupByOverlayClick(event) {
   const popup = document.querySelector('.popup_opened');
   if (event.target === popup) {
      closePopup(popup);
   }
}

// ---------------------- обработчики событий на весь документ-----------
document.addEventListener('keydown', closePopupByEscKey);
document.addEventListener('click', closePopupByOverlayClick);


