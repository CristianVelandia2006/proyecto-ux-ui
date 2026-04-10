import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleScrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-logo">
                <img src="/rombo.png" className="navbar-logo-img" alt="Logo Barbería" />
                <h1 className="h1-navbar">BARBERÍA</h1>
            </div>
            <ul className="navbar-links">
                <li><button onClick={() => handleScrollToSection('servicios')} className="nav-link">SERVICIOS</button></li>
                <li><button onClick={() => handleScrollToSection('barberos')} className="nav-link">BARBEROS</button></li>
                <li><button onClick={() => handleScrollToSection('galeria')} className="nav-link">GALERÍA</button></li>
                <li><button onClick={() => handleScrollToSection('contacto')} className="nav-link">CONTACTO</button></li>
                <Link to="/dashboard" className="navbar-button" id="btn-reservar">RESERVAR CITA </Link>
                <Link to="/login" className="navbar-button" id="btn-iniciar-sesion">INICIAR SESIÓN</Link>
            </ul>
        </nav>
    );
};

export default Navbar;