import React from 'react';

const Logout = ({ setToken }) => {
    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <button onClick={handleLogout} className="logout-button">Logout</button>
    );
};

export default Logout;
