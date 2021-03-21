import { useState } from 'react';
import { Link } from 'react-router-dom';



const Navbar = () => {
    const [currentPage, setCurrentPage] = useState('')
    return (
        <nav>
            <ul className="Navbar">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/routines">Routines</Link></li>
                <li><Link to="/activities">Activities</Link></li>
                <li className="actionButton"><Link to="/login">{localStorage.getItem('user') ? "Log out" : "Login/Register"}</Link></li>
            </ul>
        </nav>
    );
}


export default Navbar;