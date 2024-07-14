import React, { useState } from 'react';
import { api } from '../api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api('/api/auth/register', 'POST', { username, password });
            if (response.message) {
                alert(response.message);
            } else {
                alert('Error registering user he');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Error registering user he');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;