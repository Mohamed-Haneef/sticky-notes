import React from 'react';
import Logout from './Logout.jsx';
import './../Header.css';

const Header = ({ setToken }) => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Sticky Notes</h1>
            </div>
            <div className="logout-container">
                <Logout setToken={setToken} />
            </div>
        </header>
    );
};

export default Header;