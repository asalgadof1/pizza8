// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { logout, email } = useUser();

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
                {!email ? (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
