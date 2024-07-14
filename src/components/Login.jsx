import React, { useState } from 'react';
import { api } from '../api';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await api('/api/auth/login', 'POST', { username, password });
        if (data.token) {
            alert("Login success")
            setToken(data.token);
        } else {
            alert(data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;