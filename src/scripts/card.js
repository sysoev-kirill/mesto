

export class Card {
   constructor({ data, templateSelector, handleCardClick, userId, handleAddLike, handleDeleteLike, handleDeleteCard }) {
      this._data = data;
      this._nameValue = data.name;
      this._photoValue = data.link;
      this._templateSelector = templateSelector;
      this._likes = data.likes;
      this._cardId = data._id;
      this._ownerId = data.owner?._id;
      this._element = this._getTemplate();
      this._likeButton = this._element.querySelector('.element__heart');
      this._trashButton = this._element.querySelector('.element__trash');
      this._photo = this._element.querySelector('.element__photo');
      this._handleCardClick = handleCardClick;
      this._handleAddLike = handleAddLike;
      this._handleDeleteLike = handleDeleteLike;
      this._handleDeleteCard = handleDeleteCard;
      this._userId = userId;
   }

   _getTemplate() {
      const cardTemplate = document.querySelector(this._templateSelector).content;
      const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
      return cardElement;
   }

   deleteCard() {
      this._element.remove();
   }

   generateCard() {
      this._element.querySelector('.element__city').textContent = this._nameValue;
      this._photo.src = this._photoValue;
      this._photo.alt = this._nameValue;

      if (this._ownerId !== this._userId.id) {
         this._trashButton.remove();
      };
      this._countLikes = this._element.querySelector('.element__like-count');
      this._countLikes.textContent = this._likes.length;

      this._likes.filter((like) => like._id === this._userId)
  
      this._setEventListeners();
      return this._element;
   }


   toggleLike() {
      this._likeButton.classList.toggle('element__heart_active');
   }

   renderCardLike(data) {
      this._countLikes.textContent = data.likes.length;
      
      this.toggleLike()
   }


   _setEventListeners() {
      this._likeButton.addEventListener('click', () => {

         if (this._likeButton.classList.contains('element__heart_active')) {
            this._handleDeleteLike(this._cardId);

         } else {
            this._handleAddLike(this._cardId);
         }

      });

      this._trashButton.addEventListener('click', () => {
         this._handleDeleteCard();
      });

      this._photo.addEventListener('click', () => {
         this._handleCardClick(this._photoValue, this._nameValue);
      });
   }
}