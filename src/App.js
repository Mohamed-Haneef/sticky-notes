import React, { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Notes from './components/Notes.jsx';
import './App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    if (!token) {
        return (
            <div>
                <Login setToken={setToken} />
                <Register />
            </div>
        );
    }

    return <Notes token={token} />;
};

export default App;