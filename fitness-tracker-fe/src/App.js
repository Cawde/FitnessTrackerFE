import { useState, useEffect } from 'react';
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
  Login,
  Profile,
  Footer,
  Navbar,
  Modal
 } from './components';

function App() {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const logOut = () => {
    localStorage.clear();
    
  }
  useEffect(() => {

  },[])
  return (
    <div className="app">
      <Header />
      <Router>
        <nav>
          <ul className="Navbar">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/myroutines">My Routines</Link></li>
            <li><Link to="/routines">Routines</Link></li>
            <li><Link to="/activities">Activities</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/home">
            <Home
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Route>
          <Route path="/myroutines">
            <Profile 
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
          
          <Route path="/login">
            <Login
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              loginSuccessful={loginSuccessful} 
              setLoginSuccessful={setLoginSuccessful}
            />
          </Route>
        </Switch>
        <Footer />
        {localStorage.getItem('user') ? <button className="actionButton" onClick={logOut}>Log Out</button> : <li className="Login-btn"><Link to="/login">Login/Register here</Link></li>}
      </Router>
    </div>
  )
}
export default App;