
const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"

const Login = (props) => {
  const { setLoginSuccessful } = props;
  let pass = '';
  let user = '';

  const storeToken = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
  }

  const registerUser = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/users/register`, {
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
  
  const loginUser = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/users/login`, {
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

  return (
    <div className="login">
      <h1>Register or Sign in below</h1>
      <form className="input-box" onSubmit={registerUser}>
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
            className="registerbtn"
          >Register</button>
          <h2><b>Already have an account?</b> <button type="submit" className="sign-in-btn" onClick={loginUser}>Sign In</button></h2>
        </div>
      </form>
    </div>
  )
}

export default Login;