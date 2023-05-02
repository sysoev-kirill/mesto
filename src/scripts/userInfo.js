
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

}