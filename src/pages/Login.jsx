import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const Login = () => {
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            console.error('Email y contraseña son requeridos');
            return;
        }
        await login(email, password);
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
