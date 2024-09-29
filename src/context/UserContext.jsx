import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

 // Recuperar el token desde localStorage cuando la aplicación se inicie
 useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedToken !== 'false') { // Verificar que el token no sea 'false'
        setToken(storedToken);
        console.log('Token recuperado desde localStorage:', storedToken);
    }

    setLoading(false); // Finalizar la carga una vez que se recupera el token

}, []);


    // Método para hacer login
    const login = async (email, password) => {
        try {
            console.log('Datos enviados:', { email, password }); // Añadir esto para depurar

            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  email, password                 
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error en el login:', errorData); // Imprimir mensaje de error detallado
                throw new Error('Login failed');
            }

            const data = await response.json();
            setToken(data.token);
            localStorage.setItem('token', data.token); // Guardar el token en localStorage
            console.log('Token guardado después del login:', data.token); // Verifica si el token se guarda
            setEmail(data.email);
        } catch (error) {
            console.error('Error en el login:', error);
        }
    };

    // Método para hacer register
    const register = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password
                }),
            });

            if (!response.ok) {
                throw new Error('Register failed');
            }

            const data = await response.json();
            setToken(data.token);
            setEmail(data.email);
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    // Método para hacer logout
    const logout = () => {
        setToken(null);
        setEmail(null);
        localStorage.removeItem('token'); // Eliminar el token de localStorage al cerrar sesión
    };

    // Método para obtener el perfil
    const getProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error obteniendo el perfil:', error);
        }
    };

    return (
        <UserContext.Provider value={{ token, email, login, register, logout, getProfile, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
