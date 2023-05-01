// export default class UserInfo {

// 	constructor({ nameSelector, aboutSelector, avatarSelector }) {
// 		this._name = document.querySelector(nameSelector);
// 		this._about = document.querySelector(aboutSelector);
// 		this._avatar = document.querySelector(avatarSelector)
// 		// this._avatar = document.querySelector('.profile__image')
// 	}

// 	getUserInfo() {
// 		return {
// 			name: this._name.textContent,
// 			about: this._about.textContent,
			
// 		};
// 	}

// 	setUserInfo({ name, about, avatar }) {
		// if (name && this._name) { // проверяем, что передано значение name и элемент this._name существует
		// 	this._name.textContent = name;
		// }
		// if (about && this._about) { // проверяем, что передано значение about и элемент this._about существует
		// 	this._about.textContent = about;
		// }
		// if (avatar  && this._avatar) { 
		// 	this._avatar.src = avatar;
		// }
		

	// }

	// setProfileAvatar(item){
	// 	this._avatar.src = item.link;
	// }

// 	setUserAvatar(avatar) {
// 		this._avatar.src = avatar.link;
// 	}
	
	
// }

export default class UserInfo {
   constructor({ nameSelector, aboutSelector, avatarSelector }) {
      this._name = document.querySelector(nameSelector);
      this._about = document.querySelector(aboutSelector);
      this._avatar = document.querySelector(avatarSelector);
   }

   getUserInfo() {
      return { name: this._name.textContent, about: this._about.textContent, id: this._id };
   }

   setUserInfo({ name, about, avatar, id }) {
      this._name.textContent = name;
      this._about.textContent = about;
      this._avatar.src = avatar;
		this._id = id;
   }
   
   setUserAvatar(avatar) {
      this._avatar.src = avatar.link;
   }

	// setAvatar(link) {
	// 	this._avatar.src = link;
	// }
}