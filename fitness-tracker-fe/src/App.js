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
  Navbar, 
 } from './components';

function App() {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="App">
      <Header />
      
      <Router>
        <Navbar/>

        <Switch>
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
          
        </Switch>
        <Footer />
      
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