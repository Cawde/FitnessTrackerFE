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
  Login,
  Profile,
  Footer,
  Navbar,

 } from './components';

function App() {

  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {

  },[])
  return (
    <div className="app">
      <Header />
      <Navbar />
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
            />
          </Route>

          <Route path="/myroutines">
            <Profile 
            />
          </Route>

          <Route path="/routines">
            <Routines
            />
          </Route>

          <Route path="/activities">
            <Activity 
            />
          </Route>

          <Route path="/login"> 
            <Login />
          </Route>
        </Switch>
        <Footer />
       
      </Router>
    </div>
  )
}
export default App;