import tokenService from './tokenService';
// import axios from 'axios';

const BASE_URL = '/api/users/';


function signup(user) {
  return (
    fetch(BASE_URL + "signup", {
      method: "POST",
      // headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
      // what do datatype do you need to change this too?
      body: user, // <- have to make sure when sending a file/photo, that the body is formData
    })
      .then((res) => {
        if (res.ok) return res.json();
        // Probably a duplicate email
        throw new Error("Email already taken!");
      })
      // Parameter destructuring!
      // setting the token in localstorage!
      // This is when we recieve the token from the server on the client
      // and store it in localstorage
      .then(({ token }) => tokenService.setToken(token))
  );
    }

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}


export default {
  signup,
  getUser,
  logout,
  login,
};