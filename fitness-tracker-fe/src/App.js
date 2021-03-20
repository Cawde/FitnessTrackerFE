import { useState } from 'react';
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
  Login,
  Footer
 } from './components';

function App() {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const logOut = () => {
    setLoginSuccessful(false);
    localStorage.clear();
  }
  return (
    <div className="App">
      <Header />
      <Router>
          <nav>
            <ul className="Navbar">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/routines">Routines</Link></li>
              <li><Link to="/activities">Activities</Link></li>
            </ul>
          </nav>
          <Route path="/home">
            <Home
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Route>
          <Route path="/profile">
            <User 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Route>
          <Route path="/routines">
            <Routines 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Route>
          <Route path="/activities">
            <Activity 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Route>
          <Footer />
        {localStorage.getItem('user') ? <button className="actionButton" onClick={logOut}>Log Out</button> : <li className="Login-btn"><Link to="/login">Login/Register here</Link></li>}
          <Route path="/login">
            <Login
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              loginSuccessful={loginSuccessful} 
              setLoginSuccessful={setLoginSuccessful}
            />
          </Route>
      </Router>
    </div>
  )
}

export default App;