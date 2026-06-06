// src/controllers/users.js
import bcrypt from 'bcrypt';
import { createUser, authenticateUser } from '../models/users.js'; // 👈 Agrupamos los imports del mismo archivo de forma limpia

// ==========================================
// RUTAS DE REGISTRO (Tus funciones actuales)
// ==========================================

// Muestra el formulario de registro
const showUserRegistrationForm = (req, res) => {
    res.render('register', { title: 'Register' });
};

// Procesa los datos y crea el usuario
const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Encriptar la contraseña con 10 rondas de sal (salt)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Guardar el usuario en la base de datos con la contraseña ya hasheada
        const userId = await createUser(name, email, passwordHash);

        // Mensaje de éxito y redirección
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/login'); // 😉 Tip: redirigir al login suele ser más cómodo para el usuario
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

// ==========================================
// NUEVAS RUTAS DE LOGIN (Paso 2 de la actividad)
// ==========================================

// Muestra el formulario de login
const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

// Procesa los datos e inicia sesión
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Llamamos a la función del modelo
        const user = await authenticateUser(email, password);

        if (user) {
            // Guardar el objeto del usuario en la sesión
            req.session.user = user;
            req.flash('success', 'Login successful!');

            // Log en consola si estamos en desarrollo
            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            return res.redirect('/dashboard');
        } else {
            // Si la autenticación falla (devuelve null)
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        return res.redirect('/login');
    }
};

// Cierre de Sesión (Logout)
const processLogout = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.redirect('/');
            }
            res.redirect('/login');
        });
    } else {
        res.redirect('/login');
    }
};
// Middleware para proteger rutas (Paso 1 de la actividad)
const requireLogin = (req, res, next) => {
    // 1. Verificamos si el objeto user NO existe en la sesión
    if (!req.session || !req.session.user) {
        // 2. Si no existe, mandamos un mensaje flash de error y redirigimos al login
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }

    // 3. Si el usuario existe en la sesión, llamamos a next() para que continúe la petición
    next();
};
// Función para renderizar el Dashboard (Paso 3 de la actividad)
const showDashboard = async (req, res) => {
    // 1. Extraemos los datos del usuario que iniciaron sesión
    const { name, email } = req.session.user;

    // 2. Renderizamos la vista pasando las variables requeridas
    res.render('dashboard', {
        title: 'User Dashboard',
        name: name,
        email: email
    });
};
// 👈 Exportamos absolutamente todas las funciones que usarán tus rutas
export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard
};