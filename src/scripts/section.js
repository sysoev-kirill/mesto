export default class Section {
   constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
   }

   addItem(element) {
      this._container.prepend(element);
   }


   renderItems(items) {
      if (items && Array.isArray(items)) {
         items.forEach(item => {
            this._renderer(item);
         });
      }
   }
}
