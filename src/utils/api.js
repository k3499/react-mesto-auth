class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }
  _resOk(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
    //загрузка карточек с сервера
  getInitialCards(){
    return fetch(`${this._url}cards`, {
       method: 'GET',
       headers: this._headers
     })
     .then((res) => {
        return this._resOk(res);
      });
  }

    //загрузка информации о пользователе
  getUserInfo(){
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._resOk(res);
     })
  }
    //отправка новой информации о пользователе
  setUserInfo(userData){
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then((res) => {
      return this._resOk(res);
    })
  }
    //добавление карточек на сервер
  addCard(inputData){
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
    .then((res) => {
      return this._resOk(res);
    })
  }
    //смена статуса лайка

//смена статуса лайка
changeLikeCardStatus(cardId, isLiked) {
  if (isLiked) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._resOk(res);
     })
  } else {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._resOk(res);
     })
    }
  }

    
    //Удаление карточки с сервера
  removeCard(cardId){
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._resOk(res);
     })
  }
    //загрузка аватара пользователя
  avatarUpl(inputData){
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputData.avatar,
      })
    })
    .then((res) => {
      return this._resOk(res);
    })
  }
}
//подключаем апи
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
  headers: {
    authorization: '64388478-85d7-41e7-ab69-a698cc4b7b2e',
    'content-type': 'application/json'
  }});
export { api, Api }