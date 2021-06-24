export const BASE_URL = 'https://auth.nomoreparties.co';

export const reg = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    if (res.status >= 200 && res.status < 300) {
        return res;
    } else {
        let error = new Error(res.statusText);
        error.response = res;
        throw error
    }
  })
  .then((res) => {
    return res.json();
  })

}

export const auth = ({ email, password }) => {
  return fetch(`${ BASE_URL }/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    return res.json();
  })

}

export const getInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    return (data)
  })
  .catch((err) => {
    return console.log(err)
  })
};