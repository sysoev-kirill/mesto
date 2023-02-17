let userModalOpenElement = document.querySelector('.profile__edit-bnt');
let popUpElement = document.querySelector('.popup_open-profile');
let userModalCloseElement = popUpElement.querySelector('.popup__close-btn');
let nameProfile = document.querySelector('.profile__name');
let descriptionProfile = document.querySelector('.profile__description');


function openUserModal(popup) {
   popup.classList.add('popup_opened');
}

function closeUserModal(popup) {
   popup.classList.remove('popup_opened');
}

function getProfileName() {
   inputFormName.value = nameProfile.textContent;
   inputFormDescription.value = descriptionProfile.textContent;
}
function handleOpenUserModal() {
   openUserModal(popup);
   getProfileName();
}

userModalOpenElement.addEventListener('click', () => {
   openUserModal(popUpElement);
})

userModalCloseElement.addEventListener('click', () => {
   closeUserModal(popUpElement);
});



// --------------------------------------Попап с именем-----------------------

let form = document.querySelector(".popup__form");
let inputFormName = document.querySelector('.popup__profile_edit_name');
let inputFormDescription = document.querySelector('.popup__profile_edit_description');



function editInputFormName(evt) {
   evt.preventDefault();
   nameProfile.textContent = inputFormName.value;
   descriptionProfile.textContent = inputFormDescription.value;
   closeUserModal(popUpElement);
}
form.addEventListener('submit', editInputFormName);



// --------------------------------------Добавление данных для формирования карочки---

let popUpPhoto = document.querySelector('.popup_open-photo');
let popUpAddPhoto = document.querySelector('.profile__add-btn');
let userModalCreateElement = popUpPhoto.querySelector('.popup__send-btn');
let userModalClosePhoto = popUpPhoto.querySelector('.popup__close-btn');

popUpAddPhoto.addEventListener('click', () => {
   openUserModal(popUpPhoto);
});

userModalClosePhoto.addEventListener('click', () => {
   closeUserModal(popUpPhoto);
});

userModalCreateElement.addEventListener('click', () => {
   closeUserModal(popUpPhoto);
})

//------------------------------------- Формирование карточки ---------------

let cardsList = document.querySelector('.elements');

function addCard(photoValue, nameValue) {

   let cardTemplate = document.querySelector('#element').content;

   let cardElement = cardTemplate.querySelector('.element').cloneNode(true);
   let elementPhoto = cardElement.querySelector('.element__photo');
   let elementCity = cardElement.querySelector('.element__city');
   let elementTrash = cardElement.querySelector('.element__trash');
   let elementHeart = cardElement.querySelector('.element__heart');

   elementPhoto.src = photoValue;
   elementCity.textContent = nameValue;
   elementTrash.addEventListener('click', () => { cardElement.remove(); })
   elementHeart.addEventListener('click', () => {
      elementHeart.classList.toggle('element__heart_active');
   })
   elementPhoto.addEventListener('click', () => {
      openUserModalPhoto();
      getUserModalPhoto(photoValue, nameValue);
   })

   cardsList.prepend(cardElement);
}

// -------------------------------------формирование карточек по умолчанию----------

let formPhoto = document.querySelector(".popup__form_photo");
let photo = document.querySelector('.popup__profile_add_photo');
let description = document.querySelector('.popup__profile_add_description');
formPhoto.addEventListener('submit', function (evt) {
   evt.preventDefault();
   addCard(photo.value, description.value);
   photo.value = '';
   description.value = '';
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

let popupIncreasePhoto = document.querySelector('.popup_mod-dark');
popupIncreasePhoto.addEventListener('click', openUserModalPhoto)

function openUserModalPhoto() {
   popupIncreasePhoto.classList.add('popup_opened');
}

let userModalCloseElementPhoto = popupIncreasePhoto.querySelector('.popup__close-btn');
userModalCloseElementPhoto.addEventListener('click', () => {
   closeUserModal(popupIncreasePhoto);
});
popupIncreasePhoto.removeEventListener('click', openUserModalPhoto);


let popupPhotoElement = popupIncreasePhoto.querySelector(".increase-img__photo-view");
let popupPhotoDescription = popupIncreasePhoto.querySelector(".increase-img__name-view");

function getUserModalPhoto(photoValue, nameValue) {
   openUserModalPhoto(popupIncreasePhoto);
   popupPhotoElement.src = photoValue;
   popupPhotoDescription.textContent = nameValue;
}


