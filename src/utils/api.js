import { setTkn, getTkn, removeTkn } from '../utils/token';
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
    const token = getTkn();
    return fetch(`${this._url}cards`, {
       method: 'GET',
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` //Кидаем токен 
      }
     })
     .then((res) => {
        return this._resOk(res);
      });
  }

    //загрузка информации о пользователе
  getUserInfo(){
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` //Кидаем токен 
      }
    })
    .then((res) => {
      return this._resOk(res);
     })
  }
    //отправка новой информации о пользователе
  setUserInfo(userData){
    const token = getTkn();
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` //Кидаем токен 
      },
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
    const token = getTkn();
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` //Кидаем токен 
      },
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
  const token = getTkn();
  if (isLiked) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` //Кидаем токен 
      },
    }).then((res) => {
      return this._resOk(res);
     })
  } else {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` //Кидаем токен 
      },
    }).then((res) => {
      return this._resOk(res);
     })
    }
  }

    
    //Удаление карточки с сервера
  removeCard(cardId){
    const token = getTkn();
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` //Кидаем токен 
      }
    })
    .then((res) => {
      return this._resOk(res);
     })
  }
    //загрузка аватара пользователя
  avatarUpl(inputData){
    const token = getTkn();
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` //Кидаем токен 
      },
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
  url: 'https://api.mesto.k3499.nomoredomains.club/',
  headers: {
    'content-type': 'application/json',
    
  }});
export { api, Api }