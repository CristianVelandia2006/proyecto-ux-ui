import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    
    // 1. Añadimos 'experience' y 'specialty' al estado inicial
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'client',
        barberCode: '',
        experience: '', // Nuevo
        specialty: ''   // Nuevo
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const CODIGO_SECRETO_BARBERO = "BARBER-2025"; 
        let finalRole = 'client';

        if (formData.role === 'barber') {
            if (formData.barberCode !== CODIGO_SECRETO_BARBERO) {
                alert('Código de Barbero incorrecto. No puedes registrarte como Barbero.');
                return;
            } else {
                finalRole = 'barber';
            }
        }

        // 2. Incluimos los nuevos campos en el objeto newUser
        const newUser = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: finalRole,
            experience: finalRole === 'barber' ? formData.experience : null,
            specialty: finalRole === 'barber' ? formData.specialty : null
        };

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = storedUsers.find(user => user.email === newUser.email);
        if (userExists) {
            alert('Este correo ya está registrado');
            return;
        }

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        alert('¡Registro exitoso! Ya puedes iniciar sesión.');
        navigate('/login');
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="barberia-title">BARBERÍA</h1>
                <h2 className="login-subtitle">REGISTRARSE</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">NOMBRE DE USUARIO</label>
                        <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} placeholder="Juan Pérez" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">CORREO</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="role">TIPO DE CUENTA</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="role-select">
                            <option value="client">Cliente</option>
                            <option value="barber">Barbero</option>
                        </select>
                    </div>

                    {formData.role === 'barber' && (
                        <>
                            <div className="input-group barber-code-group">
                                <label htmlFor="barberCode">CÓDIGO DE ACCESO BARBERO</label>
                                <input type="password" name="barberCode" id="barberCode" value={formData.barberCode} onChange={handleChange} placeholder="Ingresa el código secreto" required />
                            </div>
                            {/* 3. Nuevos campos visibles solo para barberos */}
                            <div className="input-group">
                                <label htmlFor="experience">AÑOS DE EXPERIENCIA</label>
                                <input type="number" name="experience" id="experience" value={formData.experience} onChange={handleChange} placeholder="Ej: 5" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="specialty">ESPECIALIDAD</label>
                                <input type="text" name="specialty" id="specialty" value={formData.specialty} onChange={handleChange} placeholder="Ej: Corte Moderno, Barba" required />
                            </div>
                        </>
                    )}

                    <div className="input-group">
                        <label htmlFor="password">CONTRASEÑA</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">CONFIRMAR CONTRASEÑA</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="btn-primary">CREAR CUENTA</button>

                    <div className="signup-link">
                        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;