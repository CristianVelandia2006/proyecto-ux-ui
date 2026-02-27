import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 1. Estado para manejar mensajes de error
    const [error, setError] = useState('');

    // 2. Definimos las credenciales "quemadas"
    const USER_CORRECTO = "admin@barberia.com";
    const PASS_CORRECTA = "barber123";

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // 3. Validamos las credenciales
        if (email === USER_CORRECTO && password === PASS_CORRECTA) {
            console.log('Login exitoso');
            setError('');
            alert('¡Bienvenido a Barbería!');
            // Aquí redirigirías al dashboard usando react-router
        } else {
            console.log('Credenciales incorrectas');
            setError('Correo o contraseña incorrectos.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="barberia-title">BARBERÍA</h1>
                <h2 className="login-subtitle">INICIAR SESIÓN</h2>
                
                {/* 4. Mostramos el error si existe */}
                {error && <p style={{color: 'red', fontSize: '0.8rem'}}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">CORREO</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@barberia.com"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">CONTRASEÑA</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">ENTRAR</button>
                </form>
                
                <p className="signup-link">
                    ¿No tienes cuenta? <a href="#">Regístrate</a>
                </p>
            </div>
        </div>
    );
};

export default Login;