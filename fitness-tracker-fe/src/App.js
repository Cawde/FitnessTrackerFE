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
  Modal
 } from './components';

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {

  },[])
  return (
    <div className="App">
      <Header />
      <Router>
        <nav>
          <ul className="Navbar">
            <li><Link to="/home">Home</Link></li>
          {localStorage.getItem('user') ? <li><Link to="/myroutines">My Routines</Link></li> : null}
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
          
          <Route path="/login">
            <Login
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Route>
        </Switch>
        <Footer />
          <Login
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
          />
      </Router>
    </div>
  )
}
export default App;