import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const Navbar = () => {
    const [currentPage, setCurrentPage] = useState('')
    const logOut = () => {
        localStorage.clear();
      }
    const [loggedIn, setLoggedIn] = useState();
      useEffect(() => {
      },[])
    const userData = localStorage.getItem('user');
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/routines">Routines</Link></li>
                <li><Link to="/activities">Activities</Link></li>
                <li className="actionButton"><Link to="/login">{localStorage.getItem('user') ? "Log out" : "Login/Register"}</Link></li>
            </ul>
        </nav>
    );
}


export default Navbar;