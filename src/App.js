import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import Register from './components/Register.jsx';
import Notes from './components/Notes.jsx';
import './styles/App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        console.log("useEffect token: " + token);
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
        console.log("useEffect token end: " + token);
    }, [token]);

    return (
        <Router>
            <div className="app-container">
                <Header token={token} setToken={setToken} />
                <Routes>
                    <Route
                        path="/"
                        element={token ? <Notes token={token} setToken={setToken} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/register"
                        element={!token ? <Register /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
