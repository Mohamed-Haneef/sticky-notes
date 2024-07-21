import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import './../styles/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api('/api/auth/register', 'POST', { username, password });

            if (response.success && response.success.message) {
                alert(response.success.message);
                navigate("/login")
            } else {
                const errorMessage = response.error
                    ? parseErrorMessage(response.error)
                    : 'Unknown error occurred during registration';
                alert("Error: " + errorMessage);
            }
        } catch (error) {
            alert('Error registering user');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h3 className='register-header'>Register here</h3>
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
                <button type="submit">Register</button>
                <a href="/login" className="login-link">Already a user? Click here.</a>
            </form>
        </div>
    );
};

const parseErrorMessage = (error) => {
    try {
        const parsedError = JSON.parse(error);
        return parsedError.message || 'Unknown error occurred';
    } catch {
        return error;
    }
};

export default Register;
