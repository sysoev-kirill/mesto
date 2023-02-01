let userModalOpenElement = document.querySelector('.profile__edit-bnt');
let userModalCloseElement = document.querySelector('.popup__close-btn');
let popUpElement = document.querySelector('.popup');
let nameProfile = document.querySelector('.profile__name');
let descriptionProfile = document.querySelector('.profile__description');

function getProfileName() {
   inputFormName.value = nameProfile.textContent;
   inputFormDescription.value = descriptionProfile.textContent;
}

userModalOpenElement.addEventListener('click', openUserModal)

function openUserModal() {
   popUpElement.classList.add('popup_opened');
   getProfileName();
}

userModalCloseElement.addEventListener('click', closeUserModal)

function closeUserModal() {
   popUpElement.classList.remove('popup_opened')
}
// ----------------------------------------

let form = document.querySelector(".popup__form");
let inputFormName = document.querySelector('.popup__profile_edit_name');
let inputFormDescription = document.querySelector('.popup__profile_edit_description');


function editInputFormName(evt) {
   evt.preventDefault();
   nameProfile.textContent = inputFormName.value;
   descriptionProfile.textContent = inputFormDescription.value;
   closeUserModal();
}
form.addEventListener('submit', editInputFormName);