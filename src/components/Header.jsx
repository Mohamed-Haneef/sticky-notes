import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout.jsx';
import './../styles/Header.css';

const Header = ({ token, setToken }) => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Sticky Notes</h1>
            </div>
            <div className="nav-container">
                {!token ? (
                    <nav>
                        <Link to="/">Login</Link>
                        <Link to="/register">Register</Link>
                    </nav>
                ) : (
                    <Logout setToken={setToken} />
                )}
            </div>
        </header>
    );
};

export default Header;
