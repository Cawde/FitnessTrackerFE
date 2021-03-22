import { useEffect } from 'react';
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
 } from './components';

function App() {

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
            <li className="userText"><Link to="/login">{localStorage.getItem("user") ? `Welcome, ${localStorage.getItem("user")}, click to log out` : "Click Here to Log In"}</Link></li>
          </ul>
        </nav>
        <Switch>

          <Route exact path="/home">
            <Home/>
          </Route>

          <Route exact path="/myroutines">
            <Profile/>
          </Route>

          <Route exact path="/routines">
            <Routines/>
          </Route>

          <Route exact path="/activities">
            <Activity/>
          </Route>

          <Route exact path="/login"> 
            <Login />
          </Route>

          <Route exact path="/*">
            <Home/>
          </Route>
        </Switch>
        <Footer />
       
      </Router>
    </div>
  )
}
export default App;