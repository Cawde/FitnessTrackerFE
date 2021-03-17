import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';

import {
  Home,
  Header,
  Activity,
  Routines,
  User,
  Login
 } from './components';

function App() {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  return (
    <div className="App">
      <Header />
      <Router>
          <nav>
            <ul className="links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/routines">Routines</Link></li>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/login">Login/Register here</Link></li>
            </ul>
          </nav>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/profile">
            <User />
          </Route>
          <Route path="/routines">
            <Routines />
          </Route>
          <Route path="/activities">
            <Activity />
          </Route>
          <Route path="/login">
            <Login
              loginSuccessful={loginSuccessful} 
              setLoginSuccessful={setLoginSuccessful}
            />
          </Route>
      </Router>
    </div>
  )
}

export default App;