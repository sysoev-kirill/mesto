
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
// const nameProfile = document.querySelector('.profile__name');
// const descriptionProfile = document.querySelector('.profile__description');


const userInfo = new UserInfo({
   nameSelector: '.profile__name',
   aboutSelector: '.profile__description'
});



const profilePopupForm = new PopupWithForm(profilePopup, () => {
   userInfo.setUserInfo({
      name: inputFormName.value,
      about: inputFormDescription.value
   });
   profilePopupForm.closePopup();
})
profilePopupForm.setEventListeners();

function fillProfileInputs() {

   const infoObject = userInfo.getUserInfo();
   inputFormName.value = infoObject.name;
   inputFormDescription.value = infoObject.about;
}


profileEditButton.addEventListener('click', () => {

   fillProfileInputs();
   profilePopupForm.openPopup();

})

// --------------------------------------Попап с именем-----------------------

const profileForm = document.forms["popup__form-profile"];
const inputFormName = document.querySelector('.popup__profile_edit_name');
const inputFormDescription = document.querySelector('.popup__profile_edit_description');


// --------------------------------------Добавление данных для формирования карочки---

const popUpPhoto = document.querySelector('.popup_open-photo');
const popUpAddPhotoButton = document.querySelector('.profile__add-btn');

const popupAddCard = new PopupWithForm(popUpPhoto, () => {
   const elemData = createCard(photo.value, description.value);
   cardsList.addItem(elemData);
   popupAddCard.closePopup()
});
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

function handleCardClick(photoValue, nameValue) {
   popupWithImage.openPopup(photoValue, nameValue);

}
popupWithImage.setEventListeners();
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
      const elem = createCard(item[0], item[1]);
      return elem;
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

validatorFormPhoto.activateSubmitButton();


