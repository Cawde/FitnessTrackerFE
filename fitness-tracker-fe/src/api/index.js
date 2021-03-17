import { storeToken, getToken } from "../auth";

const BASE = 'https://murmuring-journey-02933.herokuapp.com/api';


export async function loginUser(username, password) {
  console.log(username, password)
  fetch(`${BASE}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    }).then(response => response.json())
      .then(result => {
        console.log("result from loginUser api", result);
        let token = '';
        token = result.data ? result.data.token : null;
        if (token === null) {
          alert(result.error.message);
        } else {
          storeToken(token);
        } 
        console.log(token);
      }).catch(console.error);
}

