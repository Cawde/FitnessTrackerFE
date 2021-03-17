import React from 'react';
// import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
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

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <nav>
            <ul className="links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/user">Profile</Link></li>
              <li><Link to="/routines">Routines</Link></li>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/login">Login/Register here</Link></li>
            </ul>
          </nav>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/users/me">
            <User />
          </Route>
          <Route exact path="/routines">
            <Routines />
          </Route>
          <Route exact path="activites">
            <Activity />
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;