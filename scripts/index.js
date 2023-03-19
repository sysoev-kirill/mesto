import { FormValidator } from "./validate.js";
import { Card } from "./card.js";



const profileEditButton = document.querySelector('.profile__edit-bnt');
const profilePopup = document.querySelector('.popup_open-profile');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');



function openPopup({ classList }) {
   classList.add('popup_opened');
   document.addEventListener('keydown', closePopupByEscKey);
}

function closePopup({ classList }) {
   classList.remove('popup_opened');
   document.removeEventListener('keydown', closePopupByEscKey);
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

const validatorProfileForm = new FormValidator({
   formSelector: '.popup__form',
   inputSelector: '.popup__profile',
   submitButtonSelector: '.popup__send-btn',
   inactiveButtonClass: 'popup__send-btn_inactive',
   inputErrorClass: 'popup__error',
   errorClass: 'popup__error_active'
}, profileForm);

validatorProfileForm.enableValidation();


popUpAddPhotoButton.addEventListener('click', () => {
   openPopup(popUpPhoto);
   validatorFormPhoto.deactivateSubmitButton()

})
//------------------------------------- Формирование карточки ---------------

const cardsList = document.querySelector('.elements');

function createCard(photoValue, nameValue) {
   const card = new Card(photoValue, nameValue, '#element', handleCardClick);
   return card.generateCard();
}

function addCard(photoValue, nameValue) {
   const card = createCard(photoValue, nameValue);
   cardsList.prepend(card);
}

// -------------------------------------формирование карточек по умолчанию----------

const formPhoto = document.forms["popup__form-photo"];
const photo = document.querySelector('.popup__profile_add_photo');
const description = document.querySelector('.popup__profile_add_description');


const validatorFormPhoto = new FormValidator({
   formSelector: '.popup__form',
   inputSelector: '.popup__profile',
   submitButtonSelector: '.popup__send-btn',
   inactiveButtonClass: 'popup__send-btn_inactive',
   inputErrorClass: 'popup__error',
   errorClass: 'popup__error_active'
}, formPhoto);

validatorFormPhoto.enableValidation();

formPhoto.addEventListener('submit', function (evt) {
   evt.preventDefault();
   addCard(photo.value, description.value);
   evt.target.reset();
   closePopup(popUpPhoto);
});

validatorFormPhoto.activateSubmitButton();

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


function handleCardClick(photoValue, nameValue) {
   openPopup(popupIncreasePhoto);
   popupPhotoElement.src = photoValue;
   popupPhotoElement.alt = nameValue;
   popupPhotoDescription.textContent = nameValue;
}

// -------------------- Закрытия при  ESC------------------
function closePopupByEscKey(event) {
   if (event.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
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

// ---------------------- обработчик событий на весь документ-----------

document.addEventListener('click', closePopupByOverlayClick);


