import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import '../App.css'

const Cart = () => {
    const { token } = useUser(); // Obtiene el token desde el contexto
    const [message, setMessage] = useState('');

    const handleCheckout = async () => {
        // Verificar si el token está disponible
        if (!token) {
            console.log('Token no disponible. Debe iniciar sesión.');
            setMessage('Debe iniciar sesión para realizar la compra.');
            return;
        }
        
             
        try {
            // Verificar si el token está disponible
            console.log('Token:', token);
            
            const response = await fetch('http://localhost:5000/api/checkouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Incluye el token en el encabezado
                },
                body: JSON.stringify({ cart: [] }), // Reemplaza [] con el contenido del carrito
            });

// Imprimir detalles de la respuesta para depurar
console.log('Estado de la respuesta:', response.status);
console.log('Respuesta completa:', response);


            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error en la respuesta del servidor:', errorData);
                throw new Error('Failed to complete the checkout');
            }

            const data = await response.json();
            setMessage('¡Compra realizada con éxito!');
        } catch (error) {
            console.error('Error en el checkout:', error);
            setMessage('Error al realizar la compra');
        }
    };

    return (
        <div className="cart-container">
            <h1><i className="fas fa-shopping-cart"></i> Carrito</h1>
            <button className="checkout-button" onClick={handleCheckout}>Realizar Compra</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Cart;