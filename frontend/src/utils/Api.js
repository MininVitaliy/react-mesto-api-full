class Api {
  constructor(obj) {
    this._baseUrl = obj.baseUrl;
    this._authorization = obj.headers;
  };
  
  getInitialCards () {
    return fetch( `${this._baseUrl}/cards`, {
      headers: this._authorization
    })
    .then(this._checkResponse)
  };
  
  getInitialUserMe () {
    return fetch( `${this._baseUrl}/users/me`, {
      headers: this._authorization
    })
    .then(this._checkResponse)
  };

  changeUserProfile (nameNew, aboutNew) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._authorization,
      body: JSON.stringify({
        name: `${nameNew}`,
        about: `${aboutNew}`
      })
    })
    .then(this._checkResponse)
  };
  
  changeUserAvatar (avatarNew) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._authorization,
      body: JSON.stringify({
         avatar: `${avatarNew}`
      })
    })
    .then(this._checkResponse)
  };

  addNewCardOnTheServer (nameNewCard, linkNewCard) {
    return fetch( `${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._authorization,
      body: JSON.stringify({
        name: `${nameNewCard}`,
        link: `${linkNewCard}`
      })
    })
    .then(this._checkResponse)
  };

  deleteCardTheServer (cardNumberId) {
    return fetch( `${this._baseUrl}/cards/${cardNumberId}`, {
      method: 'DELETE',
      headers: this._authorization,  
    })
    .then(this._checkResponse)
  };

  changeLikeCardStatus(cardNumberId,  presenceOfLike) {
    if (presenceOfLike) {
      return fetch( `${this._baseUrl}/cards/${cardNumberId}/likes`, {
        method: 'DELETE',
        headers: this._authorization,
      })
          .then(this._checkResponse)
    } else {
      return fetch( `${this._baseUrl}/cards/${cardNumberId}/likes`, {
        method: 'PUT',
        headers: this._authorization
      })
          .then(this._checkResponse)
    }
  };
  
  _checkResponse (res) {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
  };
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '52a3545b-5386-49f4-b8ab-457025f8bc26',
    'Content-Type': 'application/json'
  }
});

export default api