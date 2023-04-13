
import '../pages/index.css';
import { FormValidator } from "../scripts/validate.js";
import Section from "../scripts/section.js";
import { Card } from "../scripts/card.js";
import PopupWithForm from "../scripts/popupWithForm.js";
import PopupWithImage from "../scripts/popupWithImage.js";
import UserInfo from "../scripts/userInfo.js";
import karachaevo from '../images/karachaevo.jpg';
import altay from '../images/altay.jpg';
import donbuy from '../images/Donbuy.png';
import crimea from '../images/crimea.jpg';
import baikal from '../images/baikal.jpg';
import smolensk from '../images/smolensk.jpg'




const profileEditButton = document.querySelector('.profile__edit-bnt');
const profilePopup = document.querySelector('.popup_open-profile');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');


const userInfo = new UserInfo({
   nameSelector: '.profile__name',
   aboutSelector: '.profile__description'
});



const profilePopupForm = new PopupWithForm(profilePopup);
profilePopupForm.setEventListeners();

function fillProfileInputs() {

   inputFormName.value = nameProfile.textContent;
   inputFormDescription.value = descriptionProfile.textContent;
}


profileEditButton.addEventListener('click', () => {
   userInfo.getUserInfo();
   fillProfileInputs();

   profilePopupForm.openPopup();


})

// --------------------------------------Попап с именем-----------------------

const profileForm = document.forms["popup__form-profile"];
const inputFormName = document.querySelector('.popup__profile_edit_name');
const inputFormDescription = document.querySelector('.popup__profile_edit_description');


function handleProfileSubmit(evt) {
   evt.preventDefault();
   nameProfile.textContent = inputFormName.value;
   descriptionProfile.textContent = inputFormDescription.value;
   userInfo.setUserInfo({ nameProfile, descriptionProfile });
   profilePopupForm.closePopup()
}
profileForm.addEventListener('submit', handleProfileSubmit);

// --------------------------------------Добавление данных для формирования карочки---

const popUpPhoto = document.querySelector('.popup_open-photo');
const popUpAddPhotoButton = document.querySelector('.profile__add-btn');

const popupAddCard = new PopupWithForm(popUpPhoto);
popupAddCard.setEventListeners();

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
   popupAddCard.openPopup()
   validatorFormPhoto.deactivateSubmitButton()

})
//------------------------------------Открытие фотограии из карочки-----------

const popupIncreasePhoto = document.querySelector('.popup_mod-dark');

const popupPhotoElement = popupIncreasePhoto.querySelector(".increase-img__photo-view");
const popupPhotoDescription = popupIncreasePhoto.querySelector(".increase-img__name-view");

const popupWithImage = new PopupWithImage(popupIncreasePhoto);
popupWithImage.setEventListeners();

function handleCardClick(photoValue, nameValue) {
   popupWithImage.openPopup();
   popupPhotoElement.src = photoValue;
   popupPhotoElement.alt = nameValue;
   popupPhotoDescription.textContent = nameValue;
}
//------------------------------------- Формирование карточки ---------------

const initialCards = [
   [karachaevo, 'Карачаево-Черкессия'],
   [altay, 'Алтай'],
   [donbuy, 'Кабардино-Балкария'],
   [crimea, 'Крым'],
   [baikal, 'Байкал'],
   [smolensk, 'Смоленск']
];

const cardsList = new Section({
   items: initialCards,
   renderer: (item) => {
      const card = new Card(item[0], item[1], "#element", handleCardClick);
      const cardElement = card.generateCard();
      return cardElement;
   }
}, ".elements");

cardsList.renderItems();

function createCard(photoValue, nameValue) {
   const card = new Card(photoValue, nameValue, '#element', handleCardClick);
   return card.generateCard();
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
   cardsList.addItem(createCard(photo.value, description.value));
   popupAddCard.closePopup()
});

validatorFormPhoto.activateSubmitButton();


