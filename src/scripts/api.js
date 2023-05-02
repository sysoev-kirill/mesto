export default class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	_onRes(response) {
		return response.ok ? response.json() : Promise.reject({ ...response, message: "Ошибка на стороне сервиса" });
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers
		}).then(this._onRes)
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers
		}).then(this._onRes)
	}


	updateUserProfileInfo(dataProfile) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: dataProfile.name,
				about: dataProfile.description
			})
		}).then(this._onRes)
	}

	addNewCard(dataCard) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: dataCard.name,
				link: dataCard.description
			})
		}).then(this._onRes)
	}

	deleteCardById(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: "DELETE",
			headers: this._headers,
		}).then(this._onRes)
	}

	addCardLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: "PUT",
			headers: this._headers,
		}).then(this._onRes)
	}

	deleteCardLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: "DELETE",
			headers: this._headers,
		}).then(this._onRes)
	}

	editAvatarUser(data) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: data.link
			})
		})
			.then(this._getResponseData);
	}
}
