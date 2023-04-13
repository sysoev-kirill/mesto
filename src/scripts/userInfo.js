export default class UserInfo {
	// 	constructor({ name, description }) {
	// 		this._name = document.querySelector(name);
	// 		this._description = document.querySelector(description);
	// 	}

	// 	getUserInfo() {
	// 		const userInfo = {
	// 			name: this._name.textContent,
	// 			description: this._description.textContent,
	// 		};
	// 		return userInfo;
	// 	}

	// 	setUserInfo(data) {
	// 		this._name.textContent = data.name;
	// 		this._description.textContent = data.description;
	// 	}
	// }

	constructor({ nameSelector, aboutSelector }) {
		this._name = document.querySelector(nameSelector);
		this._about = document.querySelector(aboutSelector);
	}

	getUserInfo() {
		return {
			name: this._name.textContent,
			about: this._about.textContent
		};
	}

	setUserInfo({ name, about }) {
		if (name && this._name) { // проверяем, что передано значение name и элемент this._name существует
			this._name.textContent = name;
		}
		if (about && this._about) { // проверяем, что передано значение about и элемент this._about существует
			this._about.textContent = about;
		}
	}
}