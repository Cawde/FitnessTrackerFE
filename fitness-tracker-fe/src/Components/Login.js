import { useEffect, useState } from "react";
import { Redirect, Link, useHistory } from 'react-router-dom';

const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"

const Login = (props) => {
  let pass = '';
  let user = '';
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  
  const history = useHistory();

  useEffect(() => {

  }, [loginSuccessful])

  
  const storeToken = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
  }

  const registerUser = async (event) => {
    event.preventDefault();
    await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        alert(result.message);
        setLoginSuccessful(result.success);
        storeToken(result.token, user);
      }).catch(console.error);
  }
  
  const loginUser = async (event) => {
    event.preventDefault();
    await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
        alert(result.message);
        console.log(result.success);
        setLoginSuccessful(true);
        storeToken(result.token, user);
      }).catch(console.error);
  }

  console.log(loginSuccessful);

  const logOut = () => {
    localStorage.clear();
    setLoginSuccessful(false);
    history.push("/home");
  }

  if (loginSuccessful) {
    return <Redirect to="/myroutines"/>;
  }
  return (
    <div className="login">
      {localStorage.getItem('user') ? <button className="actionButton" onClick={logOut}>Log Out</button> :
      <div>
        <h1>Register or Sign in below</h1>
        <form className="input-box" onSubmit={loginUser}>
          <div className="container">
            <label><b>Enter Username</b></label>
            <input
              type="text"
              name="uname"
              placeholder="Enter Username" required
              onChange={(event) => { user = event.target.value }}
            />

            <label><b>Enter Password</b></label>
            <input
              type="password"
              name="pass"
              pattern=".{8,16}"
              title="8 or more characters"
              size="20"
              placeholder="Enter Password" required
              onChange={(event) => { pass = event.target.value }}
            />
            <hr />
            <button
              type="submit"
              className="actionButton"
              onClick={registerUser}
            >Register</button>
            <h2><b>Already have an account?</b> <button type="submit" className="actionButton" onClick={loginUser}>Sign In</button></h2>
          </div>
        </form>
      </div>
      }
    </div>
  )
}

export default Login;