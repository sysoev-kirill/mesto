
export class Card {
   constructor(photoValue, nameValue, templateSelector, handleCardClick) {
      this._nameValue = nameValue;
      this._photoValue = photoValue;
      this._templateSelector = templateSelector;
      this._element = this._getTemplate();
      this._likeButton = this._element.querySelector('.element__heart');
      this._trashButton = this._element.querySelector('.element__trash');
      this._photo = this._element.querySelector('.element__photo');
      this._handleCardClick = handleCardClick;

   }

   _getTemplate() {
      const cardTemplate = document.querySelector(this._templateSelector).content;
      const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
      return cardElement;
   }

   _toggleLike() {
      this._likeButton.classList.toggle('element__heart_active');
   }

   _deleteCard() {
      this._element.remove();
   }

   _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
         this._toggleLike();
      });

      this._trashButton.addEventListener('click', () => {
         this._deleteCard();
      });

      this._photo.addEventListener('click', () => {
         this._handleCardClick(this._photoValue, this._nameValue);
      });
   }

   generateCard() {
      this._element.querySelector('.element__city').textContent = this._nameValue;
      this._photo.src = this._photoValue;
      this._photo.alt = this._nameValue;
      this._setEventListeners();
      return this._element;
   }
}
