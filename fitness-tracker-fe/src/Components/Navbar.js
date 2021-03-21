import { useState } from 'react';
import { Link, BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { Login } from './'



const Navbar = () => {
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [currentPage, setCurrentPage] = useState('')
    const logOut = () => {
        localStorage.clear();
        
      }
    return (  
        <nav>
            <Router>
                <ul className="Navbar">
                <Route>
                    <li><Link to="/home">Home</Link></li>
                </Route>
                <Route>
                    <li><Link to="/routines">Routines</Link></li>
                </Route>
                <Route>
                    <li><Link to="/activities">Activities</Link></li>
                </Route>
                <Route>   
                    <li className="actionButton"><Link to="/login">{localStorage.getItem('user') ? "Log Out" : "Login/Register"}</Link></li>
                </Route>
                </ul>
            </Router>
        </nav>
    );
}


export default Navbar;