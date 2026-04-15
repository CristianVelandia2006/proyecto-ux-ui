import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importación limpia
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(u => u.email === email && u.password === password);

        if (user) {
            // Guardamos el usuario seleccionado en 'currentUser'
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            console.log('Login exitoso', user);
            alert('¡Bienvenido a Barbería!');
            navigate('/dashboard');
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

                {error && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>}

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
                    
                    {/* CAMBIO: Eliminamos el type="submit" del botón dentro del Link */}
                    <Link to="/register">
                        <button className="btn-register" type="button">
                            REGISTRARSE
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;