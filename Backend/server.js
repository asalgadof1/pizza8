// server.js o app.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'secret_key';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Usar este middleware en la ruta /api/checkouts
app.post('/api/checkouts', verifyToken, (req, res) => {
    // Lógica del checkout
    res.json({ message: 'Checkout successful!' });
});




// Middleware
app.use(bodyParser.json());

// Rutas de ejemplo
app.post('/api/auth/login', (req, res) => {
    // Lógica de autenticación y generación de JWT
    const { email, password } = req.body;
    // Esta es solo una simulación, debes agregar validación de credenciales
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, email });
});

app.post('/api/auth/register', (req, res) => {
    // Lógica para registrar usuarios
    const { email, password } = req.body;
    // Esta es solo una simulación
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, email });
});

app.get('/api/auth/me', (req, res) => {
    // Lógica para obtener el perfil del usuario
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ email: decoded.email });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
