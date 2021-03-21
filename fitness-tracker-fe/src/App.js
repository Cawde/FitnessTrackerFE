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
  Footer, 
  Modal,
  Navbar
 } from './components';

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const logOut = () => {
    localStorage.clear();
    
  }
  useEffect(() => {

  },[])
  return (
    <div className="App">
      <Header />
      <Router>
        <Navbar/>
        <Modal />
        <Switch>
          <Route path="/home">
            <Home
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Route>
          <Route path="/myroutines">
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
          
        </Switch>
        <Footer />
        {localStorage.getItem('user') ? <button className="actionButton" onClick={logOut}>Log Out</button> : <li className="Login-btn"><Link to="/login">Login/Register here</Link></li>}
          <Route path="/login">
            <Login
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Route>
        </Router>
        
    </div>
  )
}
export default App;