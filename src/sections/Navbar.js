import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <div className="navbar-logo">
                <img src="/rombo.png" className="navbar-logo-img" alt="Logo Barbería" />
                <h1 className="h1-navbar">BARBERÍA</h1>
            </div>
            <ul className="navbar-links">
                <li><a href="#servicios">SERVICIOS</a></li>
                <li><a href="#barberos">BARBEROS</a></li>
                <li><a href="#galeria">GALERÍA</a></li>
                <li><a href="#contacto">CONTACTO</a></li>
                <Link to="/dashboard" className="navbar-button" id="btn-iniciar-sesion">INICIAR SESIÓN</Link>
                <li><button className="navbar-button" id="btn-reservar">RESERVAR CITA</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;