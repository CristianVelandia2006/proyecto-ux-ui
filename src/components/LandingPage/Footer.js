import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-info">
                <h3 className="footer-logo">✦ BARBERÍA</h3>
                <p>Calle 93 #15-32, Bogotá</p>
                <p>Lun-Sáb 8am - 8pm</p>
                <p>+57 300 000 0000</p>
            </div>

            <div className="footer-links">
                <h4>SERVICIOS</h4>
                <ul>
                    <li><a href="#services">Corte Clásico</a></li>
                    <li><a href="#services">Corte + Barba</a></li>
                    <li><a href="#services">Afeitado</a></li>
                    <li><a href="#services">Tratamiento</a></li>
                </ul>
            </div>

            <div className="footer-links">
                <h4>BARBERÍA</h4>
                <ul>
                    <li><a href="#about">Nosotros</a></li>
                    <li><a href="#team">Nuestro equipo</a></li>
                    <li><a href="#gallery">Galería</a></li>
                    <li><a href="#blog">Blog</a></li>
                </ul>
            </div>

            <div className="footer-links">
                <h4>CUENTA</h4>
                <ul>
                    <li><a href="#login">Iniciar sesión</a></li>
                    <li><a href="#register">Registrarse</a></li>
                    <li><a href="#appointments">Mis citas</a></li>
                    <li><a href="#support">Soporte</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;