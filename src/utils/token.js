const tokenJwt = 'jwt';

export const setTkn = (token) => {
  localStorage.setItem(tokenJwt, token);
}


export const getTkn = () => localStorage.getItem(tokenJwt);


export const removeTkn = () => {
  localStorage.removeItem(tokenJwt)
}