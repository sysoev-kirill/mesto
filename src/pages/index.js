
import '../pages/index.css';
import Api from '../scripts/api.js';
import { FormValidator } from "../scripts/validate.js";
import Section from "../scripts/section.js";
import { Card } from "../scripts/card.js";
import PopupWithForm from "../scripts/popupWithForm.js";
import PopupWithImage from "../scripts/popupWithImage.js";
import PopupWithConfirm from '../scripts/popupWithConfirm';
import UserInfo from "../scripts/userInfo.js";
// import karachaevo from '../images/karachaevo.jpg';
// import altay from '../images/altay.jpg';
// import donbuy from '../images/Donbuy.png';
// import crimea from '../images/crimea.jpg';
// import baikal from '../images/baikal.jpg';
// import smolensk from '../images/smolensk.jpg'


const profileEditButton = document.querySelector('.profile__edit-bnt');
const profilePopup = document.querySelector('.popup_open-profile');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');

const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
   headers: {
      authorization: '22daa57c-a1b8-4d9c-9a76-1d146d442b74',
      'Content-Type': 'application/json'
   }
});

const userInfo = new UserInfo({
   nameSelector: '.profile__name',
   aboutSelector: '.profile__description',
   avatarSelector: '.profile__image'
});

const profilePopupForm = new PopupWithForm(profilePopup, (dataProfile) => {
   profilePopupForm.isSavingMessage("Сохранение...");
   api.updateUserProfileInfo(dataProfile)
      .then((result) =>
         userInfo.setUserInfo({ name: result.name, about: result.about, avatar: result.avatar }))
   profilePopupForm.closePopup()
      .catch((err) => console.log(err))
      .finally(() => {
         profilePopupForm.isSavingMessage("Сохранить");

      })

});

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

const popupAddCard = new PopupWithForm(popUpPhoto, (inputValues) => {
   popupAddCard.isSavingMessage("Сохранение...");
   api.addNewCard(inputValues)
      .then((res) => {
         const elemData = createCard(res);
         cardsList.addItem(elemData);
         popupAddCard.closePopup()
      })
      .catch((err) => console.log(err))
      .finally(() => {
         popupAddCard.isSavingMessage("Сохранить");
      })

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

const cardsList = new Section({
   // items: [],
   renderer: (elem) => {
      // const elem = createCard(item[0], item[1]);
      cardsList.addItem(createCard(elem));
      // return elem;
   }
}, ".elements");

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
   .then(([userData, initCard]) => {
      userId = userData._id;
      userInfo.setUserInfo({ name: userData.name, about: userData.about, id: userData._id, avatar: userData.avatar });
      cardsList.renderItems(initCard);

   })
   .catch((err) => {
      console.log(err);
   })


function createCard(elem) {
   const card = new Card({
      data: elem,
      templateSelector: '#element',
      userId: userInfo.getUserInfo(),
      handleCardClick: (name, link) => {
         popupWithImage.openPopup(name, link)
      },

      handleAddLike: (cardId) => {
         api.addCardLike(cardId)
            .then((res) => {
               card.renderCardLike(res);
            })
            .catch((err) => console.log(err));
      },
      handleDeleteLike: (cardId) => {
         api.deleteCardLike(cardId)
            .then((res) => {
               card.renderCardLike(res);
            })
            .catch(err => console.log(err));
      },

      handleDeleteCard: (cardId, element) => popupConfirmation.openPopup(cardId, element)
   },
   )

   return card.generateCard();
}

const popupDeleteCard = document.querySelector('.popup_delete');

const popupConfirmation = new PopupWithConfirm(popupDeleteCard, {
   checkDelite: (cardId, element) => {
      api.deleteCardById(cardId)
         .then(() => {
            element.deleteCard();
            popupConfirmation.closePopup();
         })
         .catch(err => console.log(err))
   }
});

popupConfirmation.setEventListeners();

const popupAvatar = document.querySelector('.popup__form_avatar')
const avatarIcon = document.querySelector('.profile__image');

const popupAvatarEdit = document.querySelector('.popup_edit-avatar')

const openPopupAvatarForm = new PopupWithForm(popupAvatarEdit, (data) => {
   openPopupAvatarForm.isSavingMessage("Сохранение...");
   api.editAvatarUser(data)
      .then(() => {
         userInfo.setUserAvatar(data)
         openPopupAvatarForm.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
         openPopupAvatarForm.isSavingMessage("Сохранить");
      })

});

openPopupAvatarForm.setEventListeners()

const validatorAvatarForm = new FormValidator({
   formSelector: '.popup__form',
   inputSelector: '.popup__profile',
   submitButtonSelector: '.popup__send-btn',
   inactiveButtonClass: 'popup__send-btn_inactive',
   inputErrorClass: 'popup__error',
   errorClass: 'popup__error_active'
}, popupAvatar);

validatorAvatarForm.enableValidation();

avatarIcon.addEventListener("click", () => {
   openPopupAvatarForm.openPopup();
   validatorAvatarForm.deactivateSubmitButton()
});

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

