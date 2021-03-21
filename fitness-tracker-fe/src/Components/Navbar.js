import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState('')
    return (
        <nav>
            <ul className="Navbar">
                <li><Link to="/home">Home</Link></li>
                {localStorage.getItem('user') ? <li><Link to="/profile">My Routines</Link></li> : null}
                <li><Link to="/routines">Routines</Link></li>
                <li><Link to="/activities">Activities</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;