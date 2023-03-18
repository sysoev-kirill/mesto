
import { setImagePopupPhoto } from "./index.js";
export class Card {
   constructor(photoValue, nameValue) {
      this._nameValue = nameValue;
      this._photoValue = photoValue;
   }

   _getTemplate() {
      const cardTemplate = document.querySelector('#element').content;
      const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
      return cardElement;
   }

   _setEventListeners() {
      this._element.querySelector('.element__heart').addEventListener('click', () => {
         this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
      });

      this._element.querySelector('.element__trash').addEventListener('click', () => {
         this._element.remove();
      });

      this._element.querySelector('.element__photo').addEventListener('click', () => {
         setImagePopupPhoto(this._photoValue, this._nameValue);
      });
   }

   generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.element__city').textContent = this._nameValue;
      this._element.querySelector('.element__photo').src = this._photoValue;

      this._element.querySelector('.element__photo').alt = this._nameValue;
      this._setEventListeners();
      return this._element;
   }
}
