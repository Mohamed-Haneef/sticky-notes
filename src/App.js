import React, { useState, useEffect } from 'react';
import Authorize from './components/Authorize.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import Register from './components/Register.jsx';
import Notes from './components/Notes.jsx';
import './App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const verification = await Authorize();
                if (!verification.ok) {
                    setToken(null);
                }
            } catch (error) {
                console.error('Failed to verify token:', error);
                setToken(null);
            }
        };

        verifyToken();
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    if (!token) {
        return (
            <div className="auth-container">
                <Login setToken={setToken} />
                <Register />
            </div>
        );
    }

    return (
        <div className="app-container">
            <Header setToken={setToken} />
            <Notes token={token} />
        </div>
    );
};

export default App;
