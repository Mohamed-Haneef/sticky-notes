import React, { useState } from 'react';
import { api } from '../api';
import './../styles/Login.css';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await api('/api/auth/login', 'POST', { username, password });

        if (data.success && data.success.token) {
            alert("Login success, You will be redirected")
            localStorage.setItem('token', data.success.token);
            setToken(data.success.token);
        } else {
            let errorMessage = 'Unknown error occurred';
            if (data.error) {
                try {
                    const parsedError = JSON.parse(data.error);
                    errorMessage = parsedError.message || 'Unknown error occurred';
                } catch {
                    errorMessage = data.error;
                }
            }
            alert("Error: " + errorMessage);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h3 className='login-header'>Login here</h3>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>

                <a href="/register" className="register-link">New here? Click here.</a>
            </form>
        </div >
    );
};

export default Login;
